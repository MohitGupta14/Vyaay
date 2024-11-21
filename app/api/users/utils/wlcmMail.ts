import axios from "axios";

export async function sendWelcomeEmail(email: string, name: string) {
  try {
    // Assuming your external email API is hosted at '/api/send-email'
    const emailApiUrl = `${process.env.NEXTAUTH_URL}/api/inviteFriends`;

    const response = await axios.post(emailApiUrl, {
      mail: email,
      action: "verifyUsers",
      name: name,
    });

    return response.data; // Return the response from the email API
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send welcome email");
  }
}
