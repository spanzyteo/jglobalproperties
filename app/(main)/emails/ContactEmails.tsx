// emails/ContactEmail.tsx

import * as React from 'react';

interface ContactEmailProps {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export const ContactEmail: React.FC<ContactEmailProps> = ({
  name,
  email,
  phone,
  message,
}) => (
  <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', backgroundColor: '#f4f4f4' }}>
    <div style={{ maxWidth: '600px', margin: '0 auto', backgroundColor: '#ffffff', borderRadius: '8px', overflow: 'hidden' }}>
      {/* Header */}
      <div style={{ backgroundColor: '#941A1A', padding: '30px', textAlign: 'center' }}>
        <h1 style={{ color: '#ffffff', margin: 0, fontSize: '24px' }}>
          New Contact Form Submission
        </h1>
      </div>

      {/* Content */}
      <div style={{ padding: '30px' }}>
        <h2 style={{ color: '#333333', fontSize: '18px', marginTop: 0 }}>
          Contact Details:
        </h2>

        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <tr>
            <td style={{ padding: '12px 0', borderBottom: '1px solid #eeeeee' }}>
              <strong style={{ color: '#666666' }}>Name:</strong>
            </td>
            <td style={{ padding: '12px 0', borderBottom: '1px solid #eeeeee', color: '#333333' }}>
              {name}
            </td>
          </tr>
          <tr>
            <td style={{ padding: '12px 0', borderBottom: '1px solid #eeeeee' }}>
              <strong style={{ color: '#666666' }}>Email:</strong>
            </td>
            <td style={{ padding: '12px 0', borderBottom: '1px solid #eeeeee', color: '#333333' }}>
              {email}
            </td>
          </tr>
          <tr>
            <td style={{ padding: '12px 0', borderBottom: '1px solid #eeeeee' }}>
              <strong style={{ color: '#666666' }}>Phone:</strong>
            </td>
            <td style={{ padding: '12px 0', borderBottom: '1px solid #eeeeee', color: '#333333' }}>
              {phone}
            </td>
          </tr>
        </table>

        <div style={{ marginTop: '30px' }}>
          <h3 style={{ color: '#333333', fontSize: '16px', marginBottom: '10px' }}>Message:</h3>
          <div style={{
            backgroundColor: '#f9f9f9',
            padding: '20px',
            borderRadius: '6px',
            border: '1px solid #eeeeee',
            color: '#333333',
            lineHeight: '1.6'
          }}>
            {message}
          </div>
        </div>

        {/* Reply Button */}
        <div style={{ marginTop: '30px', textAlign: 'center' }}>
          <a
            href={`mailto:${email}`}
            style={{
              backgroundColor: '#941A1A',
              color: '#ffffff',
              padding: '14px 30px',
              textDecoration: 'none',
              borderRadius: '6px',
              display: 'inline-block',
              fontWeight: 'bold'
            }}
          >
            Reply to {name}
          </a>
        </div>
      </div>

      {/* Footer */}
      <div style={{ backgroundColor: '#f8f8f8', padding: '20px', textAlign: 'center', borderTop: '1px solid #eeeeee' }}>
        <p style={{ margin: 0, color: '#999999', fontSize: '12px' }}>
          This message was sent from the JGlobal Properties contact form
        </p>
        <p style={{ margin: '10px 0 0 0', color: '#999999', fontSize: '12px' }}>
          © {new Date().getFullYear()} JGlobal Properties. All rights reserved.
        </p>
      </div>
    </div>
  </div>
);