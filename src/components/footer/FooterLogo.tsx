import Image from 'next/image';

const FooterLogo = (props: any) => (
  <Image width={300} height={300} src="/logo.svg" alt="Jplus Logo" {...props} />
);

export default FooterLogo;
