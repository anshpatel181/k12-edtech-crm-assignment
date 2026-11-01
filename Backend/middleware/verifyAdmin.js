import jwt from "jsonwebtoken"
import db from "../config/db.js";

export const verifyAdmin = async (req, res, next) => {

    try {
        
        const token = req.cookies.__adminToken

        console.log("Cookies received:", Object.keys(req.cookies));
console.log("Admin token received:", Boolean(token));
      
        if (!token) {
          return res.status(401).json({ success: false, message: "Access Denied" });
        }
      
        const userDetails = jwt.verify(token, process.env.JWT_SECRET_KEY);        

        if(userDetails.role !== "Admin" || userDetails.id.length === 0) {
            return res.status(403).json({message: "Access Denied"})
        }

        const result = await db.query("select id from admin_cred where id = $1", [userDetails.id]);
      
        if (result.rows.length === 0) {
          return res.status(403).json({ success: false, message: "Access Denied" });
        }

        req.admin = userDetails
      
        next();
    } catch (error) {
        console.error(error)
        return res.status(500).json({success: false, message: "Server Error Occurred"})
    }
}
