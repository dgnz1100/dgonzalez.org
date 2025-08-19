
'use client';
import Image from 'next/image';

import { motion } from 'framer-motion';

export default function DigitalPortfolio() {
	return (
		<section className="py-20 px-4">
			<div className="max-w-6xl mx-auto">
				<motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-3xl font-bold mb-12 text-center">
					Digital Portfolio
				</motion.h2>

				<div className="grid grid-cols-1 gap-8">
					{[
						{
							title: 'Leadership',
							description: '"A leader is best when people barely know he exists, when his work is done, his aim fulfilled, they will say: we did it ourselves." - Lao Tzu ',
							details: [
								'Project Lead for Alpha Centauri, the winning team for the Medline RFP',
								'Delivered a Gift Project solo, showcasing my ability to drive projects independently',
								'Assisted my peers through Geek Week, fostering a collaborative learning environment where no one is left behind',
								'Led my team Peace of Mind during our Civics project, aiming to improve mental health awareness.',
							],
							tech: ['Team Building', 'Teamwork', 'Leadership', 'Cross-Functional Collaboration'],
						},
						{
							title: 'Business',
							description: '"A business that makes nothing but money is a poor business." - Henry Ford',
							details: [
								'Led in developing a comprehensive solution for Medline\'s RFP, addressing key pain points and delivering on the MVP',
								'Developed an understanding of HIPAA Compliance, adhering to regulations and best practices',
								'Led by streamlining workflows and managing personalities within the team, maximizing productivity and collaboration',
								'Learned the value of receiving feedback and incorporating it into my work thanks to my mentor Hewitt',
								'Improved greatly on my public speaking ability, being able to present complex ideas clearly and confidently',
								'Gained experience in consulting with clients to gather requirements and deliver tailored solutions',
							],
							tech: ['Public Speaking', 'Consulting', 'SDLC', 'HIPAA Compliance', 'Agile'],
						},
												{
							title: 'Technology',
							description: '"Any sufficiently advanced technology is indistinguishable from magic" - Arthur C. Clarke',
							details: [
								'Integrated generative AI through the OpenAI API, enhancing user interaction and support',
								'Became proficient in SQL and data modeling, utilizing my knowledge to assist my peers during Geek Week',
								'Worked on optimizing API responses for faster load times',
								'Gained collaborative skills working with cross-functional teams to deliver projects, using GitHub',
								'Developed a Chatbot integrating the OpenAI API using JavaScript',
							],
							tech: ['React.js', 'Express.js', 'Node.js', 'Machine Learning', 'SQL', 'Python', 'API\'s'],
						},
												{
							title: 'Career Planning',
							description: '“A mind that is stretched by new experiences can never go back to its old dimensions.” — Oliver Wendell Holmes Jr. ',
							details: [
								'Heavily interested in working with Machine Learning, particularly in optimization.',
								'Interested in applying Cybersecurity principles to software development',
								'Planning to pursue an education in Mathematics and Computer Science',
								'My current dream in life is to be in a position where I can create opportunities for others.',
							],
							tech: ['Machine Learning', 'Cybersecurity', 'Software Development', 'Solutions Engineering', 'Sales'],
						},
						{
							title: 'Wellness',
							description: 'Developed and deployed machine learning models for predictive analytics',
							details: [
								'Implemented feature engineering and data preprocessing pipelines',
								'Trained and optimized models using TensorFlow and PyTorch',
								'Deployed models as REST APIs using FastAPI',
								'Monitored model performance and retrained as necessary',
							],
							tech: ['Faith', 'Family', 'Music', 'Time Management'],
						},
					].map((project, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: index * 0.2 }}
							className="bg-gray-900/50 rounded-xl p-6 backdrop-blur-sm border border-gray-800"
						>
							<h3 className="text-2xl font-bold mb-4">{project.title}</h3>
							<p className="text-gray-400 mb-6">{project.description}</p>
										<div className="mb-6">
											<h4 className="text-lg font-semibold mb-2">Key Achievements:</h4>
											{project.title === 'Wellness' ? (
												<Image src="/sloth.jpg" alt="Wellness Project" width={400} height={300} className="rounded-lg w-full max-w-md mx-auto" />
											) : (
												<ul className="list-disc list-inside space-y-2 text-gray-300">
													{project.details.map((detail, i) => (
														<li key={i}>{detail}</li>
													))}
												</ul>
											)}
										</div>
							<div className="flex flex-wrap gap-2">
								{project.tech.map((tech, i) => (
									<span key={i} className="text-sm px-3 py-1 bg-blue-500/10 rounded-full border border-blue-500/20">
										{tech}
									</span>
								))}
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}
