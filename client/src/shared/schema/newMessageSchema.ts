import { z } from 'zod';
import { makeZodI18nMap } from 'zod-i18n-map';

type FileType = File & {
  readonly lastModified: number;
  readonly name: string;
  readonly size: number;
  readonly type: string;
};


const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^0\d{2}\d{6}$/;
const ALLOWED_EXTENSIONS = ['png', 'jpeg', 'jpg', 'pdf', 'doc', 'vnd.openxmlformats-officedocument.wordprocessingml.document', 'mp3', 'mp4'];
const MAX_FILE_SIZE = 10 * 1024 * 1024;


z.setErrorMap(makeZodI18nMap({ ns: 'translation' }));

export const newMessageSchema: any = z.object({
  name: z.string().refine((val) => val.length >= 3, { params: { i18n: 'myValidations.nameValidation' } }).optional(),
  email: z.string().refine((val) => emailRegex.test(val), { params: { i18n: 'myValidations.emailValidation' } }),
  phone: z.string().refine((val) => phoneRegex.test(val), { params: { i18n: 'myValidations.phoneValidation' } }).optional(),
  category: z.string().refine((val) => val !== '', { params: { i18n: 'myValidations.categoryValidation' } }),
  status: z.string().refine((val) => val !== '', { params: { i18n: 'myValidations.statusValidation' } }),
  date: z.string().refine((val) => val !== '', { params: { i18n: 'myValidations.dateValidation' } }).optional(),
  period: z.string().refine((val) => val !== '', { params: { i18n: 'myValidations.periodValidation' } }).optional(),
  witness: z.string().refine((val) => val !== '' || val !== undefined, { params: { i18n: 'myValidations.witnessValidation' } }).optional(),
  message: z.string().refine((val) => val !== '', { params: { i18n: 'myValidations.messageValidation' } }),
  file: z.custom<File | undefined | null>().refine((files) => {
    if (!files || !files) return true;
    return files.size <= MAX_FILE_SIZE;
  }, { params: { i18n: 'myValidations.fileSizeValidation' } }).optional().refine(
    (files) => {
      if (!files || !files) return true;
      const file = files;
      const extension = file.type.split('/').pop()?.toLowerCase();
      return extension ? ALLOWED_EXTENSIONS.includes(extension) : false;
    },
    { params: { i18n: 'myValidations.fileFormatValidation' } }
  ).optional()
});
export type NewMessageType = z.infer<typeof newMessageSchema>;