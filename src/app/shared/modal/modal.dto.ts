export const modalInitializer = (): ModalDto => {
  return ({
    show: false,
    message: '',
    isError: false,
    isSuccess: false,
    isInfo: false, 
    close: () => {},
    confirm: () => {}
  })
}

export interface ModalDto {
  show: boolean;
  message: string;
  isError: boolean;
  isSuccess: boolean;
  isInfo: boolean;
  showButtons?: boolean;
  close: () => void;
  confirm?: () => void;
}
