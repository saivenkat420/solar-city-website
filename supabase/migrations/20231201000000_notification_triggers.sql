-- Enable the http extension if not already enabled
CREATE EXTENSION IF NOT EXISTS http;

-- Create the function for email notifications
CREATE OR REPLACE FUNCTION notify_contact_submission_email()
RETURNS TRIGGER AS $$
BEGIN
  PERFORM
    http.post(
      url := 'https://YOUR_PROJECT_REFERENCE.supabase.co/functions/v1/contact-notification-email',
      headers := '{"Content-Type": "application/json", "Authorization": "Bearer YOUR_SUPABASE_SERVICE_ROLE_KEY"}',
      body := json_build_object('record', NEW, 'type', TG_OP)::text
    );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create the function for Slack notifications
CREATE OR REPLACE FUNCTION notify_contact_submission_slack()
RETURNS TRIGGER AS $$
BEGIN
  PERFORM
    http.post(
      url := 'https://YOUR_PROJECT_REFERENCE.supabase.co/functions/v1/contact-notification-slack',
      headers := '{"Content-Type": "application/json", "Authorization": "Bearer YOUR_SUPABASE_SERVICE_ROLE_KEY"}',
      body := json_build_object('record', NEW, 'type', TG_OP)::text
    );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create the function for SMS notifications
CREATE OR REPLACE FUNCTION notify_contact_submission_sms()
RETURNS TRIGGER AS $$
BEGIN
  PERFORM
    http.post(
      url := 'https://YOUR_PROJECT_REFERENCE.supabase.co/functions/v1/contact-notification-sms',
      headers := '{"Content-Type": "application/json", "Authorization": "Bearer YOUR_SUPABASE_SERVICE_ROLE_KEY"}',
      body := json_build_object('record', NEW, 'type', TG_OP)::text
    );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create triggers that call the functions when a new row is inserted
DROP TRIGGER IF EXISTS trigger_contact_email_notification ON contacts;
CREATE TRIGGER trigger_contact_email_notification
AFTER INSERT ON contacts
FOR EACH ROW EXECUTE FUNCTION notify_contact_submission_email();

DROP TRIGGER IF EXISTS trigger_contact_slack_notification ON contacts;
CREATE TRIGGER trigger_contact_slack_notification
AFTER INSERT ON contacts
FOR EACH ROW EXECUTE FUNCTION notify_contact_submission_slack();

DROP TRIGGER IF EXISTS trigger_contact_sms_notification ON contacts;
CREATE TRIGGER trigger_contact_sms_notification
AFTER INSERT ON contacts
FOR EACH ROW EXECUTE FUNCTION notify_contact_submission_sms();

-- Create notifications table for in-app notifications
CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id),
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  related_record JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  read_at TIMESTAMP WITH TIME ZONE,
  type TEXT
);

-- Trigger to create in-app notifications
CREATE OR REPLACE FUNCTION create_contact_notification()
RETURNS TRIGGER AS $$
BEGIN
  -- Insert a notification for each admin user
  INSERT INTO notifications (user_id, title, message, related_record, type)
  SELECT 
    id, 
    'New Contact Form Submission', 
    'New inquiry from ' || NEW.name || ' (' || NEW.phone || ')',
    row_to_json(NEW),
    'contact_form'
  FROM auth.users
  WHERE user_metadata->>'role' = 'admin';
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for in-app notifications
DROP TRIGGER IF EXISTS trigger_contact_in_app_notification ON contacts;
CREATE TRIGGER trigger_contact_in_app_notification
AFTER INSERT ON contacts
FOR EACH ROW EXECUTE FUNCTION create_contact_notification(); 