import db from "../config/db.js";

export const storeInquiry = async (req, res) => {
  try {
    const { name, email, phone_number, user_type, category, message } =
      req.validated.body;

      console.log(req.validated.body)

    await db.query(
      "insert into inquiries (name, email, phone_number, user_type, category, message) values ($1, $2, $3, $4, $5, $6) returning *",
      [name, email, phone_number, user_type, category, message],
    );

    return res.status(200).json({ message: "Inquiry Submitted Successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error occurred" });
  }
};

export const fetchDashboardData = async (req, res) => {
  try {
    const result = await db.query("select * from inquiries order by created_at desc limit 20");

    return res.status(200).json({ success: true, data: result.rows, message: result.rows.length === 0 ? "No Inquiries found" : "Inquiries fetched successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server Error Occurred" });
  }
};
