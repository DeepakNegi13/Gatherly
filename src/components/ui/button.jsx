import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva } from "class-variance-authority";
import { cn } from "cn";

const buttonVariants = cva(
	"group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
	{
		variants: {
			variant: {
				default: "bg-[#E65100] text-white hover:bg-[#D84315] shadow-sm",
				primary:
					"bg-[#E65100] text-white hover:bg-[#D84315] shadow-sm active:scale-[0.98]",
				destructive:
					"bg-destructive text-destructive-foreground hover:bg-destructive/90",
				danger: "bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 active:scale-[0.98]",
				outline:
					"border border-[#CCC8BA] bg-transparent hover:bg-[#F2F1EC] text-[#222] active:scale-[0.98]",
				secondary:
					"bg-[#F2F1EC] hover:bg-[#E7E5DC] text-[#222] border border-[#DDD9CE] active:scale-[0.98]",
				ghost: "hover:bg-accent hover:text-accent-foreground",
				link: "text-primary underline-offset-4 hover:underline",
				dark: "bg-[#191919] hover:bg-[#2b2b2b] text-white shadow-sm active:scale-[0.98]",
			},
			size: {
			 default: "h-10 px-4 py-2",
        sm: "px-3 py-1.5 text-xs rounded-lg gap-1.5",
        md: "h-10 px-4 py-2 text-sm rounded-xl gap-2",
        lg: "px-5 py-2.5 text-base font-semibold rounded-xl gap-2.5",
        icon: "h-10 w-10",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
);

function Button({
	className,
	variant = "default",
	size = "default",
	...props
}) {
	return (
		<ButtonPrimitive
			data-slot="button"
			className={cn(buttonVariants({ variant, size, className }))}
			{...props}
		/>
	);
}

export { Button };
