export const prerender = false;

// Types for Mailjet (if you install node-mailjet, uncomment the import below)
// import mailjet from 'node-mailjet';

export async function POST({ request }) {
  try {
    const { email } = await request.json();

    console.log('Newsletter subscription received:', { email });

    // Validate required fields
    if (!email) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Email is required',
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }

    // Initialize Mailjet client
    // Uncomment when you install node-mailjet:
    /*
    const mailjetClient = mailjet.connect(
      import.meta.env.MAILJET_API_KEY || '',
      import.meta.env.MAILJET_SECRET_KEY || ''
    );
    */

    // For now, using fetch API to call Mailjet REST API directly
    const MAILJET_API_KEY = import.meta.env.MAILJET_API_KEY;
    const MAILJET_SECRET_KEY = import.meta.env.MAILJET_SECRET_KEY;
    const MAILJET_LIST_ID = import.meta.env.MAILJET_LIST_ID; // Your newsletter list ID

    if (!MAILJET_API_KEY || !MAILJET_SECRET_KEY) {
      throw new Error('Mailjet credentials not configured');
    }

    // Create contact in Mailjet
    const contactResponse = await fetch(
      'https://api.mailjet.com/v3/REST/contact',
      {
        method: 'POST',
        headers: {
          Authorization: `Basic ${Buffer.from(`${MAILJET_API_KEY}:${MAILJET_SECRET_KEY}`).toString('base64')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          IsExcludedFromCampaigns: false,
          Name: email,
          Email: email,
        }),
      }
    );

    let contactData;
    if (contactResponse.ok) {
      contactData = await contactResponse.json();
    } else if (contactResponse.status === 400) {
      // Contact might already exist, try to get it
      const existingContactResponse = await fetch(
        `https://api.mailjet.com/v3/REST/contact/${email}`,
        {
          headers: {
            Authorization: `Basic ${Buffer.from(`${MAILJET_API_KEY}:${MAILJET_SECRET_KEY}`).toString('base64')}`,
          },
        }
      );

      if (existingContactResponse.ok) {
        contactData = await existingContactResponse.json();
      } else {
        throw new Error('Failed to create or retrieve contact');
      }
    } else {
      throw new Error(`Failed to create contact: ${contactResponse.status}`);
    }

    // Add contact to newsletter list (if MAILJET_LIST_ID is provided)
    if (MAILJET_LIST_ID && contactData?.Data?.[0]?.ID) {
      const subscriptionResponse = await fetch(
        'https://api.mailjet.com/v3/REST/listrecipient',
        {
          method: 'POST',
          headers: {
            Authorization: `Basic ${Buffer.from(`${MAILJET_API_KEY}:${MAILJET_SECRET_KEY}`).toString('base64')}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            IsUnsubscribed: false,
            ContactID: contactData.Data[0].ID,
            ListID: parseInt(MAILJET_LIST_ID),
          }),
        }
      );

      console.log('Subscription response:', await subscriptionResponse.json());

      if (!subscriptionResponse.ok && subscriptionResponse.status !== 400) {
        // 400 might mean already subscribed, which is fine
        console.warn(
          'Failed to add contact to list:',
          await subscriptionResponse.text()
        );
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Successfully subscribed to newsletter',
        contactId: contactData?.Data?.[0]?.ID,
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}
