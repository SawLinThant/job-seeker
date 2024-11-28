import { atom } from 'jotai';

export const ownerAtom = atom(null);
export const jobFormIndexAtom = atom(null);
export const paginationOwnerAtom = atom({ pageIndex: 0, pageSize: 10 });
export const tabIndexAtom = atom(0);
export const jobsPayloadAtom = atom(null);
export const userCredentialAtom = atom<{
  email?: string;
  request_id?: string;
  name?: string;
  password?: string;
  phone?: string;
} | null>(null);

export const showSidebarAtom = atom<boolean>(true);
export const detailConversationDataAtom = atom<{
  id: string;
  receiver: {
    id: string;
    name: string;
    image: {
      id: string;
      title: string;
      path: string;
      size: string;
      file_format: string;
      created_at: string;
      updated_at: string;
    };
    role: string;
  };
  receiver_type: string;
  message: string;
  last_message_by: string;
  sent_at: string;
  is_seen: boolean;
} | null>(null);
