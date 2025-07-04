interface MainBannerProps {
  banner: string;
  altValue: string;
}

export default function MainBanner({ banner, altValue }: MainBannerProps) {
  return (
    <div className="w-full h-35 mb-4 rounded-lg overflow-hidden">
      <img src={banner} alt={altValue} className="w-full h-full object-cover" />
    </div>
  );
}
