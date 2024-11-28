import './Modal.css';

const Modal: React.FC<any> = ({ children, className }) => {
  return (
    <>
      <div className="z-40 backdrop">
        <div className={`${className} modal z-50 w-full mx-5`}>
          <div className="modal-content">
            <div className="flex flex-col items-center justify-between shadow-lg">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
