const express = require("express")
const util = require("../../utils")

const router = express.Router()

router.post("/signin", async (req, res) => {
    const { email } = req.body
    if (!email) {
        console.error("[SIGN-IN ERROR]:: invalid email")
        res.status(400).json({ status: "ERROR", message: "Email is required" })
    }

    const otp = util.generateOTP()
    const expiresAt = Date.now() + 5 * 60 * 1000 // otp is only valid for 5 minutes

    await appServices.cacheDB.hSet(email, { otp, expiresAt })

    res.json({ "status": "OK", otp })
})

router.post("/verify-otp", async (req, res) => {
    const { email, otp } = req.body
    if (!email) {
        console.error("[SIGN-IN ERROR]:: invalid email")
        res.status(400).json({ status: "ERROR", message: "Email is required" })
    }

    if (!otp) {
        console.error("[SIGN-IN ERROR]:: invalid OTP")
        res.status(400).json({ status: "ERROR", message: "OTP is required" })
    }

    const record = await appServices.cacheDB.hGetAll(email)
    if (!record) return res.status(400).json({ message: "No OTP request found" })

    if (Date.now() > record.expiresAt) {
        await appServices.cacheDB.delete([email])
        return res.status(400).json({ message: "OTP expired" })
    }

    if (record.otp !== otp) return res.status(400).json({ message: "Invalid OTP" })

    await appServices.cacheDB.delete([email])
    res.json({ "status": "OK", "message": "Email verified successfully" })
})

module.exports = router