'use client';

import { FireworksBackground } from '@/components/animate-ui/components/backgrounds/fireworks';

type FireworksBackgroundDemoProps = {
  population: number;
};

export default function FireworksBackgroundDemo({
  population,
}: FireworksBackgroundDemoProps) {

  return (
    <FireworksBackground
      className="absolute inset-0 flex items-center justify-center rounded-xl"
      color="#F3D3EB"
      population={population}
    />
  );
}