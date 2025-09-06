import EditorLayout from '@/components/editor/EditorLayout';

export default function EditorPage({ params }: { params: { siteId: string } }) {
  // In a real app, you would fetch site data here based on the siteId and user session.
  const siteData = {
    id: params.siteId,
    name: params.siteId.charAt(0).toUpperCase() + params.siteId.slice(1).replace('-', ' '),
  };

  return <EditorLayout site={siteData} />;
}
