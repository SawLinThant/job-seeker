import Image from "next/image";

const SelectResponsive:React.FC<any> = ({
  icon,
  title,
  options,
  selectedData,
  setSelectedData,
  isSelectDropdown,
}) => {
  return (
    <div className="py-4">
      <div className="flex items-center gap-2 mb-4">
        <Image alt="gg" src={`/icons/${icon}.svg`} width={20} height={20} />
        <h1 className="text-lg font-semibold capitalize">{title}</h1>
      </div>
      {isSelectDropdown
        ? options?.map((option:any, index:any) => (
            <div
              key={index}
              onClick={() =>
                setSelectedData({
                  ...selectedData,
                  [title]: option,
                })
              }
              className="flex items-center gap-2 py-3"
            >
              <div>
                {selectedData[title]?.id == option.id ? (
                  <Image alt="fill" width={20} height={20} src="/images/selectboxfill.svg" />
                ) : (
                  <Image alt="fill" width={20} height={20} src="/images/selectbox.svg" />
                )}
              </div>
              <p>{option?.title}</p>
            </div>
          ))
        : options?.map((option:any, index:number) => (
            <div className="py-3" key={index}>
              <div
                className="flex items-center justify-between gap-2"
                onClick={() => {
                  if (
                    selectedData[title]?.some((item:any) => item.id == option.id)
                  ) {
                    setSelectedData({
                      ...selectedData,
                      [title]: selectedData[title].filter(
                        (item:any) => item.id !== option.id
                      ),
                    });
                  } else {
                    setSelectedData({
                      ...selectedData,
                      [title]: [...selectedData[title], option],
                    });
                  }
                }}
              >
                <label className="text-sm ms-5">{option?.title}</label>
                {selectedData[title]?.some((item:any) => item?.id == option?.id) ? (
                  <Image alt="base" width={20} height={20} src="/images/_Checkbox base.svg" />
                ) : (
                  <Image alt="base" width={20} height={20} src="/images/_Checkbox base (1).svg" />
                )}
              </div>
            </div>
          ))}
    </div>
  );
};

export default SelectResponsive;
