CREATE TABLE IF NOT EXISTS admins (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS inquiries (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone_number VARCHAR(15) NOT NULL,
    user_type VARCHAR(20) NOT NULL
        CHECK (user_type IN ('Parent', 'Student', 'School')),
    category VARCHAR(30) NOT NULL
        CHECK (category IN ('Scholarship', 'Concert', 'Admission', 'General Query')),
    message TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    status VARCHAR(20) NOT NULL DEFAULT 'pending'
        CHECK (status IN ('pending', 'contacted', 'resolved'))
);

CREATE INDEX IF NOT EXISTS idx_inquiries_category
    ON inquiries (category);

CREATE INDEX IF NOT EXISTS idx_inquiries_user_type
    ON inquiries (user_type);

CREATE INDEX IF NOT EXISTS idx_inquiries_created_at
    ON inquiries (created_at DESC);


