'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Card } from '../ui/card';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
	CardTitle: z
		.string()
		.min(2, { message: 'Card title must be at least 2 characters.' }),
	category: z
		.string({ required_error: 'Please select a category.' })
		.min(1, { message: 'Please select a category.' }),
	CostOfCard: z.coerce
		.number()
		.min(0, { message: 'Cost of Card must be a non-negative number.' }),
	ProfitPerHour: z.coerce
		.number({
			required_error: 'Profit Per Hour is required',
			invalid_type_error: 'Profit Per Hour must be a positive number',
		})
		.positive(),
	requiredCard: z.string().optional(),
	requiredCardLevel: z.coerce
		.number()
		.min(0, { message: 'Required Card Level must be a non-negative number.' })
		.optional(),
	image: z
		.instanceof(File)
		.refine(
			(file) => ['image/jpeg', 'image/png', 'image/gif'].includes(file.type),
			{
				message: 'Only .jpg, .png, and .gif formats are supported.',
			}
		),
});

type FormValues = z.infer<typeof formSchema>;

export default function AddCardForm() {
	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			CardTitle: '',
			category: '',
			CostOfCard: 0,
			ProfitPerHour: 0,
			requiredCard: '',
			requiredCardLevel: 0,
		},
	});
	const { toast } = useToast();
	const [cards, setCards] = useState<Card[]>([]); // State to store cards
	const [isCardSelected, setIsCardSelected] = useState(false);
	const [showConfetti, setShowConfetti] = useState(false); // State to manage confetti
	const [isLoading, setIsLoading] = useState(false);
	// console.log("🚀 ~ AddCardForm ~ cards:", cards)

	// Fetch all cards from the API
	useEffect(() => {
		const fetchCards = async () => {
			try {
				const response = await axios.get('/api/cards');
				setCards(response.data);
			} catch (error) {
				console.error('Error fetching cards:', error);
			}
		};

		fetchCards();
	}, []);

	async function onSubmit(values: FormValues) {
		console.log('🚀 ~ onSubmit ~ values:', values);
		setIsLoading(true);
		const formData = new FormData();

		// Append form values
		formData.append('CardTitle', values.CardTitle);
		formData.append('CostOfCard', values.CostOfCard.toString());
		formData.append('ProfitPerHour', values.ProfitPerHour.toString());
		formData.append('category', values.category);
		// Append the selected card ObjectId
		if (values.requiredCard && values.requiredCardLevel) {
			formData.append('requiredCardId', JSON.parse(values.requiredCard).id);
			formData.append(
				'requiredCardTitle',
				JSON.parse(values.requiredCard).title
			);
			formData.append('requiredCardLevel', values.requiredCardLevel.toString());
		}

		// Append the file (image)
		if (values.image) {
			formData.append('image', values.image);
		} else {
			alert('Image is required.');
			return;
		}
		const apiEndpoint = 'https://new-admin-pannel-rho.vercel.app/api/add-card';

		await axios
			.post(apiEndpoint, formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			})
			.then((response) => {
				console.log(response.data);

				// Show confetti for 3 seconds, then display the alert
				setShowConfetti(true);
				setTimeout(() => {
					setShowConfetti(false);
					setTimeout(() => {
						toast({
              className: 'bg-primary text-white',
              title:'congratulations',
							description: 'Card Added successfully!',
							duration: 2000,
						});
					}, 100); // Slight delay to ensure confetti finishes smoothly
				}, 3000); // Confetti will be shown for 3 seconds
			})
			.catch((error) => {
				console.error(error);
				toast({
					variant: 'destructive',
					title: 'Uh oh! Something went wrong.',
					description: 'There was a problem with your request.',
					duration: 2000,
				});
			});

		setIsLoading(false);
	}

	return (
		<Card className="p-6 rounded-xl">
			{showConfetti && <Confetti recycle={false} />}
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
					<FormField
						control={form.control}
						name="CardTitle"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Card Title</FormLabel>
								<FormControl>
									<Input placeholder="Enter Card Title " {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="category"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Category</FormLabel>
								<Select onValueChange={field.onChange}>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Select a category" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										<SelectItem value="PR&Team">PR&Team</SelectItem>
										<SelectItem value="Markets">Markets</SelectItem>
										<SelectItem value="web3">web3</SelectItem>
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="CostOfCard"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Cost of Card</FormLabel>
								<FormControl>
									<Input type="number" {...field} onFocus={(e) => {
                      if (e.target.value === '0') {
                        e.target.value = '';
                      }
                    }}
                    onBlur={(e) => {
                      if (e.target.value === '') {
                        e.target.value = '0';
                      }
                    }} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="ProfitPerHour"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Profit per hour</FormLabel>
								<FormControl>
									<Input
										datatype="number"
										type="number"
										{...field}
                    onFocus={(e) => {
                      if (e.target.value === '0') {
                        e.target.value = '';
                      }
                    }}
                    onBlur={(e) => {
                      if (e.target.value === '') {
                        e.target.value = '0';
                      }
                    }}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* Card Selection Dropdown for Required Card */}
					<FormField
						control={form.control}
						name="requiredCard"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Select Required Card</FormLabel>
								<Select
									onValueChange={(value) => {
										field.onChange(value);
										setIsCardSelected(Boolean(value)); // Set the state to true if a card is selected
									}}
								>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Select a card" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{cards.map((card) => (
											<SelectItem key={card.id} value={JSON.stringify(card)}>
												{card.title}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>

					<motion.div
						initial={{ height: 0, opacity: 0 }}
						animate={
							isCardSelected
								? { height: 'auto', opacity: 1 }
								: { height: 0, opacity: 0 }
						}
						transition={{ duration: 0.4 }}
					>
						{isCardSelected && (
							<FormField
								control={form.control}
								name="requiredCardLevel"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Required Card Level</FormLabel>
										<FormControl>
											<Input type="number" {...field} 
                      onFocus={(e) => {
                        if (e.target.value === '0') {
                          e.target.value = '';
                        }
                      }}
                      onBlur={(e) => {
                        if (e.target.value === '') {
                          e.target.value = '0';
                        }
                      }}
                      />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						)}
					</motion.div>

					<FormField
						control={form.control}
						name="image"
						render={({ field: { onChange, ref } }) => (
							<FormItem>
								<FormLabel>Upload Image</FormLabel>
								<FormControl>
									<Input
										type="file"
										accept="image/jpeg,image/png,image/gif"
										onChange={(e) => onChange(e.target.files?.[0])}
										ref={ref}
										className="file-input"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type="submit" disabled={isLoading} className="w-40">
						{' '}
						{isLoading ? (
							<Loader2 className="mr-2 h-4 w-4 animate-spin" />
						) : (
							'Add Task'
						)}{' '}
					</Button>
				</form>
			</Form>
		</Card>
	);
}
