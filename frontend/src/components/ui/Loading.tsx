import React from "react";

export const Loading = () => {
	return (
		<div className="flex flex-col items-center justify-center h-screen bg-background">
			<div className="flex space-x-2">
				<div className="w-4 h-4 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></div>
				<div className="w-4 h-4 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></div>
				<div className="w-4 h-4 bg-primary rounded-full animate-bounce"></div>
			</div>
			<p className="mt-4 text-lg font-medium text-muted-foreground animate-pulse">
				Loading your Mindbloom...
			</p>
		</div>
	);
};
