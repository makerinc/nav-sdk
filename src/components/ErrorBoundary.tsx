import { Component, ErrorInfo, ReactNode } from 'react';

type Props = {
	fallback: ReactNode;
	children: ReactNode;
};

type State = {
	hasError: boolean;
};

class ErrorBoundary extends Component<Props, State> {
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
			return this.props.fallback;
		}

		return this.props.children;
	}
}

export default ErrorBoundary;