const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password required" });
  }

  const query = "SELECT * FROM users WHERE email = ?";

  db.query(query, [email], (err, results) => {
    if (err) {
      console.error("Login error:", err);
      return res.status(500).json({ message: "Server error" });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: "User not found" });
    }

    const user = results[0];

    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid password" });
    }

    return res.json({
      message: "Login successful",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  });
});

router.put("/change-password", (req, res) => {
  const { userId, currentPassword, newPassword } = req.body;

  if (!userId || !currentPassword || !newPassword) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const findUserQuery = "SELECT * FROM users WHERE id = ?";

  db.query(findUserQuery, [userId], (err, results) => {
    if (err) {
      console.error("Find user error:", err);
      return res.status(500).json({ message: "Server error" });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = results[0];

    if (user.password !== currentPassword) {
      return res.status(401).json({ message: "Current password is incorrect" });
    }

    const updatePasswordQuery = "UPDATE users SET password = ? WHERE id = ?";

    db.query(updatePasswordQuery, [newPassword, userId], (err) => {
      if (err) {
        console.error("Update password error:", err);
        return res.status(500).json({ message: "Server error" });
      }

      return res.json({ message: "Password updated successfully" });
    });
  });
});

router.put("/profile/:userId", (req, res) => {
  const { userId } = req.params;
  const { name, email, phone, dateOfBirth, department, bio } = req.body;

  if (!userId) {
    return res.status(400).json({ message: "User ID required" });
  }

  const query = `
    UPDATE users 
    SET 
      name = ?, 
      email = ?, 
      phone = ?, 
      date_of_birth = ?, 
      department = ?, 
      bio = ? 
    WHERE id = ?
  `;

  db.query(
    query,
    [name, email, phone, dateOfBirth, department, bio, userId],
    (err, result) => {
      if (err) {
        console.error("Update profile error:", err);
        return res.status(500).json({ message: "Server error" });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "User not found" });
      }

      const selectQuery = "SELECT id, name, email, phone, date_of_birth, department, enrollment_date, bio, role FROM users WHERE id = ?";
      db.query(selectQuery, [userId], (err, results) => {
        if (err) {
          console.error("Fetch updated user error:", err);
          return res.status(500).json({ message: "Server error" });
        }

        return res.json({
          message: "Profile updated successfully",
          user: results[0],
        });
      });
    }
  );
});

module.exports = router;