import PolicyLayout from '@/components/layout/PolicyLayout';
import { privacyPolicyHtml } from '@/content/legalPl';

export default function PrivacyPolicy() {
  return (
    <PolicyLayout title="Polityka Prywatności">
      <div dangerouslySetInnerHTML={{ __html: privacyPolicyHtml }} />
    </PolicyLayout>
  );
}
