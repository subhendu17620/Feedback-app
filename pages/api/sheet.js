import { google } from "googleapis"


async function handler(req, res) {

    try {

        if (req.method === 'POST') {
            const { Name, Email, Feedback } = req.body

            const auth = new google.auth.GoogleAuth({
                credentials: {
                    client_email: process.env.CLIENT_EMAIL,
                    client_id: process.env.CLIENT_ID,
                    private_key: process.env.PRIVATE_KEY.replace(/\\n/g, '\n'),
                },
                scopes: [
                    'https://www.googleapis.com/auth/drive',
                    'https://www.googleapis.com/auth/drive.file',
                    'https://www.googleapis.com/auth/spreadsheets',
                ],
            });

            const sheets = google.sheets({
                auth,
                version: 'v4',
            });

            const response = await sheets.spreadsheets.values.append({
                spreadsheetId: process.env.SPREADSHEET_ID,
                range: 'Sheet1!A2:D',
                valueInputOption: 'USER_ENTERED',
                requestBody: {
                    values: [[Name, Email, Feedback]],
                },
            });


            res.status(201).json({ message: 'Feedback posted to spreadsheet!', response })
        }

    } catch (error) {
        console.log(error);
    }

}

export default handler;