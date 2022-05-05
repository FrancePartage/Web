import Link from 'next/link';
import Image from 'next/image';

type LogoProps = {
	width?: number,
	height?: number
}

const Logo = ({ width = 30, height = 30 }: LogoProps) => {
  return (
    <Link href="/">
      <a>
        <div>
          <Image src="/images/logo.svg" alt="Logo" width={width} height={height} />
        </div>
      </a>
    </Link>
  );
}

export default Logo;