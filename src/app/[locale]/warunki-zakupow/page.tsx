import PolicyLayout from '@/components/layout/PolicyLayout';
import { termsOfServiceHtml } from '@/content/legalPl';

export default function Terms() {
  return (
    <PolicyLayout title="Warunki Zakupów">
      <div dangerouslySetInnerHTML={{ __html: termsOfServiceHtml }} />
    </PolicyLayout>
  );
}
