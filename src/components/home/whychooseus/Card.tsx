import Image from 'next/image';

const Card: React.FC<any> = ({ service }) => {
  return (
    <div id="Journey" className="flex flex-col w-full rounded-2xl border border-[#EAECF0]">
      <Image
        width={200}
        height={200}
        alt="dgg"
        src={service.img}
        className="w-full h-[240px] md:w-[250px] md:h-[150px] lg:w-auto lg:h-[300px] object-cover rounded-t-2xl"
      />
      <div className="px-6 py-8">
        <span className="text-sm font-semibold text-[#197CC0]">{service.subTitle}</span>
        <h1 className="text-lg lg:text-2xl font-semibold text-[rgb(29,41,57)] mt-3 mb-2">
          {service.title}
        </h1>
        <p className="text-base text-[#1D2939]">{service.content}</p>
      </div>
    </div>
  );
};

export default Card;
