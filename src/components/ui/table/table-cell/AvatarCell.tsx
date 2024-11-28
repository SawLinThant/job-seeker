import Image from 'next/image';

export function AvatarCell({ renderedCellValue, row }: any) {
  return (
    <div className="flex items-center gap-x-2">
      <>
        {row?.original?.imageUrl ? (
          <Image src="https://github.com/shadcn.png" alt="sdg" width={40} height={40} />
        ) : (
          <Image
            src="https://github.com/shadcn.png"
            className="rounded-full"
            alt="sdg"
            width={40}
            height={40}
          />
        )}
      </>

      <div>
        <div className="text-[14px] text-textGray ">{row?.original?.name}</div>
      </div>
    </div>
  );
}
