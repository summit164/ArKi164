export const TAB_FORM = 'form'
export const TAB_SUCCESS = 'success'
export const TAB_FAIL = 'fail'
export const TAB_LOADING = 'loading'

export const ORDER_MAX_FILES = 5

export const accept = [
  '.jpg',
  '.jpeg',
  '.png',
  '.webp',
  '.gif',
  '.bmp',
  '.tiff',
  '.heic',
  '.heif',
  '.svg',
  '.ico',

  '.pdf',
  '.txt',
  '.csv',
  '.rtf',
  '.html',
  '.xml',

  '.doc',
  '.docx',
  '.xls',
  '.xlsx',
  '.ppt',
  '.pptx',

  '.odt',
  '.ods',
  '.odp'
]?.join(',')

export const allowedTypes = [
  // Изображения
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'image/gif',
  'image/bmp',
  'image/tiff',
  'image/heic',
  'image/heif',
  'image/svg+xml',
  'image/x-icon',

  // Документы
  'application/pdf',
  'text/plain',
  'text/csv',
  'text/rtf',
  'text/html',
  'application/rtf',
  'application/xml',

  // Microsoft Office
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // docx
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // xlsx
  'application/vnd.ms-powerpoint',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation', // pptx

  // OpenDocument / LibreOffice
  'application/vnd.oasis.opendocument.text',
  'application/vnd.oasis.opendocument.spreadsheet',
  'application/vnd.oasis.opendocument.presentation'
]
