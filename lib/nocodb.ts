const NOCODB_API_TOKEN = 'Svr4gp4MNeB2EjlBsiVOVeisQ1Z9qw0oio3pwFup';
const NOCODB_TABLE_ID = 'm5sbx1l3cg2q458';
const NOCODB_BASE_URL = 'https://app.nocodb.com/api/v2';

interface AttachmentData {
  title: string;
  mimetype: string;
  size: number;
  url: string;
  path: string;
}

interface CareerApplicationData {
  fullName: string;
  major: string;
  portfolioUrl?: string;
  resumeAttachment?: AttachmentData[];
}

export async function uploadAttachmentToNocoDB(file: File): Promise<AttachmentData[]> {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${NOCODB_BASE_URL}/storage/upload`, {
    method: 'POST',
    headers: {
      'xc-token': NOCODB_API_TOKEN,
    },
    body: formData,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to upload attachment: ${errorText}`);
  }

  const data = await response.json();
  return data;
}

export async function createCareerApplication(applicationData: CareerApplicationData): Promise<unknown> {
  const recordData: Record<string, unknown> = {
    'Full Name': applicationData.fullName,
    'Major': applicationData.major,
  };

  if (applicationData.portfolioUrl) {
    recordData['Porfolio URL(s) (Optional)'] = applicationData.portfolioUrl;
  }

  if (applicationData.resumeAttachment && applicationData.resumeAttachment.length > 0) {
    recordData['Resume'] = applicationData.resumeAttachment;
  }

  const response = await fetch(`${NOCODB_BASE_URL}/tables/${NOCODB_TABLE_ID}/records`, {
    method: 'POST',
    headers: {
      'xc-token': NOCODB_API_TOKEN,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(recordData),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to create record: ${errorText}`);
  }

  return response.json();
}
