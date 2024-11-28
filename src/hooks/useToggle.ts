import React from 'react';

export type ToggleReturnType = [
  boolean,
  { toggle: () => void; handleClose: () => void; handleOpen: () => void },
];
export const useToggle = (initState: boolean) => {
  const [show, setShow] = React.useState<boolean>(initState);

  const handleOpen = () => setShow(true);
  const handleClose = () => setShow(false);
  const toggle = () => {
    setShow(!show);
  };

  return [show, { toggle, handleClose, handleOpen }];
};
