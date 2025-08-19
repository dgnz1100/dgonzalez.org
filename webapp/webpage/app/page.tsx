'use client';

import HeroSection from './components/HeroSection';
// ...existing code...
import ContactSection from './components/ContactSection';
import MeddyChatbot from './components/MeddyChatbot';
import DigitalPortfolio from './components/DigitalPortfolio';

export default function BackendPortfolio() {
	return (
		<main className="min-h-screen bg-[#1A1A1A] text-white overflow-x-hidden">
			<HeroSection />
			<DigitalPortfolio />
			<ContactSection />
			<MeddyChatbot />
		</main>
	);
}
