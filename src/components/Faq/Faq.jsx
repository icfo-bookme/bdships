import Link from "next/link";

export default function Faq() {
	return (
		<section className="dark:bg-gray-100 dark:text-gray-800">
			<div className="container flex flex-col justify-center p-4 mx-auto md:p-8">
				<p className="p-2 text-sm font-medium tracking-wider text-center uppercase text-blue-600">
					How It Works
				</p>
				<h2 className="mb-2 text-2xl font-bold text-blue-950 leading-none text-center sm:text-3xl">
					BDShips – Frequently Asked Questions
				</h2>
				<div className="w-20 mb-6 h-1 bg-[#0678B4] mx-auto"></div>

				<div className="flex flex-col divide-y sm:px-8 lg:px-12 xl:px-32 text-blue-950">

					<details>
						<summary className="py-4 outline-none cursor-pointer focus:underline">
							How do I book ship tickets with BDShips?
						</summary>
						<div className="px-4 pb-4">
							<p>
								You can easily book ship tickets using our website. Select your departure and destination ports, choose your travel date, select preferred ship and cabin type, and complete payment. Your e-ticket will be available instantly.
							</p>
							<div className="mt-4">
								<Link href="/ships" className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded hover:bg-blue-200 transition-colors">Book Ship Tickets</Link>
							</div>
						</div>
					</details>

					<details>
						<summary className="py-4 outline-none cursor-pointer focus:underline">
							What payment options does BDShips support?
						</summary>
						<div className="px-4 pb-4">
							<ul className="list-disc list-inside">
								<li>Debit/Credit Cards (Visa, Mastercard)</li>
								<li>Mobile Banking (bKash, Nagad, Rocket, Upay)</li>
								<li>Internet Banking</li>
								<li>Cash on Terminal (for some routes)</li>
							</ul>
							<div className="mt-4">
								<Link href="/payment-methods" className="text-sm text-blue-600 hover:underline">Learn more about payment options</Link>
							</div>
						</div>
					</details>

					<details>
						<summary className="py-4 outline-none cursor-pointer focus:underline">
							How will I receive my ship ticket?
						</summary>
						<div className="px-4 pb-4">
							<p>
								After successful payment, your e-ticket will be sent to your registered email and SMS. You can also download it from your account dashboard.
							</p>
							<div className="mt-4">
								<Link href="/contact" className="text-sm text-blue-600 hover:underline">Contact us if you dont receive ticket</Link>
							</div>
						</div>
					</details>

					<details>
						<summary className="py-4 outline-none cursor-pointer focus:underline">
							Can I cancel or modify my ship booking?
						</summary>
						<div className="px-4 pb-4">
							<p>
								Cancellations and modifications depend on the shipping company policy and departure time. Generally, cancellations 24+ hours before departure get partial refund. Contact us for changes.
							</p>
							<div className="mt-4">
								<Link href="/refund-policy" className="text-sm text-blue-600 hover:underline">View cancellation policy</Link>
							</div>
						</div>
					</details>

					<details>
						<summary className="py-4 outline-none cursor-pointer focus:underline">
							What is BDShips refund policy for ship tickets?
						</summary>
						<div className="px-4 pb-4">
							<p>
								Refunds are processed after deducting applicable service charges and based on shipping company rules. Refunds usually take 5-7 business days and are processed via original payment method.
							</p>
							<div className="mt-4">
								<Link href="/refund-policy" className="text-sm text-blue-600 hover:underline">Read full refund policy</Link>
							</div>
						</div>
					</details>

					<details>
						<summary className="py-4 outline-none cursor-pointer focus:underline">
							What documents do I need for ship travel?
						</summary>
						<div className="px-4 pb-4">
							<ul className="list-disc list-inside">
								<li>Printed e-ticket or digital ticket on phone</li>
								<li>Valid photo ID (NID, Passport, Driving License)</li>
								<li>For children: Birth certificate if required</li>
							</ul>
							<div className="mt-4">
								<Link href="/travel-guide" className="text-sm text-blue-600 hover:underline">View travel requirements</Link>
							</div>
						</div>
					</details>

					<details>
						<summary className="py-4 outline-none cursor-pointer focus:underline">
							What types of cabins are available on ships?
						</summary>
						<div className="px-4 pb-4">
							<ul className="list-disc list-inside">
								<li>First Class AC Cabin</li>
								<li>Second Class AC Cabin</li>
								<li>Third Class Cabin</li>
								<li>Deck Class</li>
								<li>VIP Suite (on selected ships)</li>
							</ul>
							<div className="mt-4">
								<Link href="/cabin-types" className="text-sm text-blue-600 hover:underline">View cabin details</Link>
							</div>
						</div>
					</details>

					<details>
						<summary className="py-4 outline-none cursor-pointer focus:underline">
							Can I book for a group or family?
						</summary>
						<div className="px-4 pb-4">
							<p>
								Yes, you can book multiple tickets for family or group travel. We offer group discounts for bookings of 10+ passengers.
							</p>
							<div className="mt-4">
								<Link href="/group-booking" className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded hover:bg-blue-200 transition-colors">Group Booking</Link>
							</div>
						</div>
					</details>

					<details>
						<summary className="py-4 outline-none cursor-pointer focus:underline">
							What if my ship is delayed or cancelled?
						</summary>
						<div className="px-4 pb-4">
							<p>
								In case of delays or cancellations due to weather or technical issues, we will notify you immediately and assist with rescheduling or full refund as per company policy.
							</p>
							<div className="mt-4">
								<Link href="/ships" className="text-sm text-blue-600 hover:underline">Ship Ticket Info</Link>
							</div>
						</div>
					</details>

					<details>
						<summary className="py-4 outline-none cursor-pointer focus:underline">
							How early should I arrive at the terminal?
						</summary>
						<div className="px-4 pb-4">
							<p>
								We recommend arriving at least 2 hours before departure for domestic routes and 3 hours for international routes to complete check-in procedures.
							</p>
							<div className="mt-4">
								<Link href="/terminal-info" className="text-sm text-blue-600 hover:underline">Terminal Information</Link>
							</div>
						</div>
					</details>

					<details>
						<summary className="py-4 outline-none cursor-pointer focus:underline">
							Can I carry vehicles on the ship?
						</summary>
						<div className="px-4 pb-4">
							<p>
								Yes, most ships allow carrying motorcycles, cars, and other vehicles. Additional charges apply and advance booking is recommended.
							</p>
							<div className="mt-4">
								<Link href="/vehicle-booking" className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded hover:bg-blue-200 transition-colors">Book Vehicle Space</Link>
							</div>
						</div>
					</details>

					<details>
						<summary className="py-4 outline-none cursor-pointer focus:underline">
							What amenities are available on ships?
						</summary>
						<div className="px-4 pb-4">
							<ul className="list-disc list-inside">
								<li>Restaurant and food service</li>
								<li>AC cabins with beds</li>
								<li>Common washrooms</li>
								<li>Seating areas</li>
								<li>Entertainment (on some ships)</li>
							</ul>
						</div>
					</details>

					<details>
						<summary className="py-4 outline-none cursor-pointer focus:underline">
							Is there luggage restriction on ships?
						</summary>
						<div className="px-4 pb-4">
							<p>
								Generally, you can carry reasonable luggage. For excessive luggage, additional charges may apply. Contact the shipping company for specific limits.
							</p>
							<div className="mt-4">
								<Link href="/luggage-policy" className="text-sm text-blue-600 hover:underline">Luggage Policy</Link>
							</div>
						</div>
					</details>

					<details>
						<summary className="py-4 outline-none cursor-pointer focus:underline">
							Can I get senior citizen or student discount?
						</summary>
						<div className="px-4 pb-4">
							<p>
								Yes, most shipping companies offer discounts for senior citizens, students, and children. Valid ID proof required during check-in.
							</p>
							<div className="mt-4">
								<Link href="/discounts" className="text-sm text-blue-600 hover:underline">View available discounts</Link>
							</div>
						</div>
					</details>

					<details>
						<summary className="py-4 outline-none cursor-pointer focus:underline">
							What should I do if I face issues during booking?
						</summary>
						<div className="px-4 pb-4">
							<p>
								Contact our Customer Support Team:
								<br />
								📧 Email: <a href="mailto:support@bdships.com" className="text-blue-600 underline">support@bdships.com</a><br />
								📞 Hotline: <a href="tel:01967776777" className="text-blue-600 underline">01967776777</a>
							</p>
							<div className="mt-4">
								<Link href="/contact" className="text-sm text-blue-600 hover:underline">Contact Support</Link>
							</div>
						</div>
					</details>

					<details>
						<summary className="py-4 outline-none cursor-pointer focus:underline">
							Does BDShips offer seasonal discounts?
						</summary>
						<div className="px-4 pb-4">
							<p>
								Yes! We offer regular promotions, early bird discounts, and seasonal offers. Follow our website and social media for latest deals.
							</p>
							<div className="mt-4">
								<Link href="/deals" className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded hover:bg-blue-200 transition-colors">View Current Deals</Link>
							</div>
						</div>
					</details>

					<details>
						<summary className="py-4 outline-none cursor-pointer focus:underline">
							Can I change passenger name after booking?
						</summary>
						<div className="px-4 pb-4">
							<p>
								Name changes are generally not allowed due to security reasons. Minor corrections may be possible with valid documentation and fees.
							</p>
						</div>
					</details>

					<details>
						<summary className="py-4 outline-none cursor-pointer focus:underline">
							Are meals included in the ticket price?
						</summary>
						<div className="px-4 pb-4">
							<p>
								Meals are usually not included in the base fare. Most ships have restaurants and food services available for purchase onboard.
							</p>
						</div>
					</details>

					<details>
						<summary className="py-4 outline-none cursor-pointer focus:underline">
							What routes does BDShips cover?
						</summary>
						<div className="px-4 pb-4">
							<p>
								We cover all major domestic ship routes in Bangladesh including Dhaka-Chittagong, Barisal-Khulna, Dhaka-Barisal, and coastal routes.
							</p>
							<div className="mt-4">
								<Link href="/routes" className="text-sm text-blue-600 hover:underline">View All Routes</Link>
							</div>
						</div>
					</details>

				</div>
			</div>
		</section>
	);
}