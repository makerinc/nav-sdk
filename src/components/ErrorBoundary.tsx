import React from '../react';

type ErrorInfo = React.ErrorInfo;
type ReactNode = React.ReactNode;


type Props = {
	renderFallback: () => ReactNode;
	children: ReactNode;
};

type State = {
	hasError: boolean;
};

class ErrorBoundary extends React.Component<Props, State> {
	public state: State = {
		hasError: false
	};

	public static getDerivedStateFromError(_: Error): State {
		return { hasError: true };
	}

	public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
		console.error('Error caught in ErrorBoundary:', error, errorInfo);
	}

	public render(): ReactNode {
		if (this.state.hasError) {
			return this.props.renderFallback();
		}

		return this.props.children;
	}
}

export default ErrorBoundary;