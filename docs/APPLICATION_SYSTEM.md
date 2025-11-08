# Skyrider School Application System

A protected application registration system for Skyrider School built with Next.js 16, React, and TypeScript.

## Features

### Student Registration (`/register`)

- Comprehensive application form with sections:
  - Personal Information
  - Address Details
  - Academic Information
  - Guardian Information
  - Emergency Contact
  - Additional Information (medical conditions, comments)
- Form validation (required fields, email format, phone format)
- Success confirmation page
- Responsive design for all devices

### Admin Dashboard (`/admin/applications`)

- Password-protected access
- View all submitted applications
- Real-time statistics (Total, Pending, Reviewed, Accepted)
- Search functionality (by name, email, or program)
- Filter by application status
- Detailed application view modal
- Modern, intuitive interface

### API Routes (`/api/application`)

- **POST** - Submit new application
  - Validates all required fields
  - Checks for duplicate emails
  - Stores data in JSON file
  - Returns application ID
- **GET** - Retrieve all applications (protected)
  - Requires Bearer token authentication
  - Returns all applications with metadata

## Setup Instructions

### 1. Environment Variables

Create or update `.env.local` in the root directory:

```env
# Admin secret token for API authentication
ADMIN_SECRET_TOKEN=your-secret-token-here-change-in-production

# Public token for client-side (same as above for simplicity)
NEXT_PUBLIC_ADMIN_SECRET_TOKEN=your-secret-token-here-change-in-production
```

**Important**: Change the default token in production!

### 2. Install Dependencies

```bash
npm install
```

### 3. Run Development Server

```bash
npm run dev
```

The application will be available at:

- Student Registration: `http://localhost:3000/register`
- Admin Dashboard: `http://localhost:3000/admin/applications`

### 4. Admin Access

Default admin password: `admin123`

**Important**: Change this in production by modifying the authentication logic in `/app/admin/applications/page.tsx`

## Data Storage

Applications are stored in `/data/applications.json` (created automatically on first submission).

Each application includes:

- Unique application ID
- Student personal information
- Guardian information
- Emergency contact details
- Academic preferences
- Submission timestamp
- Application status (pending, reviewed, accepted, rejected)

## Security Features

1. **API Protection**: GET endpoint requires Bearer token authentication
2. **Admin Dashboard**: Password-protected access
3. **Form Validation**: Both client-side and server-side validation
4. **Duplicate Prevention**: Email uniqueness check
5. **Data Sanitization**: All inputs are trimmed and validated

## File Structure

```
app/
├── register/
│   └── page.tsx              # Student application form
├── admin/
│   └── applications/
│       └── page.tsx          # Admin dashboard
└── api/
    └── application/
        └── route.ts          # API endpoints

data/
└── applications.json         # Application data storage (auto-created)

components/
└── Navbar.tsx               # Updated with "Apply Now" button
```

## Customization

### Change Form Fields

Edit `/app/register/page.tsx`:

1. Update `formData` state
2. Add/remove form sections
3. Update validation in API route

### Modify Application Status

Edit the `status` type in both:

- `/app/register/page.tsx`
- `/app/api/application/route.ts`

### Enhance Admin Dashboard

Add features in `/app/admin/applications/page.tsx`:

- Export to CSV/Excel
- Email notifications
- Status update functionality
- Advanced filtering

## Production Deployment

1. **Change all default passwords and tokens**
2. **Set up proper authentication** (consider NextAuth.js or similar)
3. **Use a proper database** (PostgreSQL, MongoDB, etc.) instead of JSON file
4. **Add email notifications** for applicants and admins
5. **Implement CAPTCHA** for spam prevention
6. **Set up backup system** for application data
7. **Add rate limiting** to prevent abuse

## Next Steps

- [ ] Integrate proper authentication system
- [ ] Connect to database (Prisma + PostgreSQL recommended)
- [ ] Add email notifications
- [ ] Implement document upload feature
- [ ] Add application status update functionality
- [ ] Create applicant tracking system
- [ ] Generate reports and analytics

## Support

For issues or questions, contact the development team.
