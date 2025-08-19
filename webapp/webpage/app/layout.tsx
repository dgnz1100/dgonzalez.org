import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	metadataBase: new URL('https://dgonzalez.org'), // Change to your production domain when deploying
	title: 'Diego Gonzalez - Software Developer',
	description:
		'Welcome to my portfolio! I am a passionate backend developer specializing in building scalable server architectures, robust APIs, and high-performance distributed systems. With expertise in cloud infrastructure and database optimization, I create efficient and reliable backend solutions.',
	keywords: [
		'Artificial Intelligence',
		'Software Engineer',
		'System Architecture',
		'API Development',
		'IT',
		'Cloud Computing',
		'Microservices',
		'DevOps',
		'Diego Gonzalez',
		'Node.js',
		'Python',
		'JavaScript',
		'Machine Learning',
		'System Design',
		'Backend Architecture',
	],
	authors: [{ name: 'Diego Gonzalez' }],
	creator: 'Diego Gonzalez',
	openGraph: {
		title: 'Diego Gonzalez - Backend Developer Portfolio',
		description: 'Passionate backend developer crafting scalable and efficient server architectures. Explore my projects and technical expertise.',
		url: 'https://dgonzalez.org',
		siteName: 'Diego Gonzalez - Portfolio',
		images: [
			{
				url: '/og-image.jpg',
				width: 1200,
				height: 630,
				alt: 'Diego Gonzalez - Backend Developer Portfolio',
			},
		],
		locale: 'en_US',
		type: 'website',
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			'max-video-preview': -1,
			'max-image-preview': 'large',
			'max-snippet': -1,
		},
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>{children}</body>
		</html>
	);
}
