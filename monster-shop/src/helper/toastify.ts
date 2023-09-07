import { TypeOptions, toast } from 'react-toastify';

export default function toastify(response: string, toastType: TypeOptions) {
  toast(response, {
    type: toastType,
  });
}
