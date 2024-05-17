"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { forwardRef } from "react";
import { useFormStatus } from "react-dom";
import { FormErrors } from "./form-errors";

interface FormInputProps {
	id: string;
	label?: string;
	type?: string;
	placeholder?: string;
	required?: boolean;
	disabled?: boolean;
	errors?: Record<string, string[] | undefined>;
	className?: string;
	defaultValue?: string;
	onBlur?: () => void;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
	(
		{
			id,
			label,
			type,
			placeholder,
			required,
			disabled,
			errors,
			className,
			defaultValue = "",
			onBlur,
		} : FormInputProps ,
		ref
	) => {
		const { pending } = useFormStatus();

		return (
			<div className="space-y-2">
				<div className="space-y-1">
					{label ? (
						<div>
							<Label
								htmlFor={id}
								className="text-sm font-semibold text-neutral-700"
							>
								{label}
							</Label>
						</div>
					) : null}

					<Input
						onBlur={onBlur}
						defaultValue={defaultValue}
						required={required}
						ref={ref}
						name={id}
						type={type}
						placeholder={placeholder}
						disabled={pending || disabled}
						className={cn("text-sm px-2 py-1 h-8", className)}
						aria-describedby={`${id}-error`}
					/>
				</div>

				<FormErrors id={id} errors={errors || {}} />
			</div>
		);
	}
);

FormInput.displayName = "FormInput";
