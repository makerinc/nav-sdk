import SharedComponents from "../SharedComponents";

type CustomTarget = "_self" | "_blank" | "_parent" | "_top" | "product" | "category";

export type SimpleLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
	target?: Exclude<CustomTarget, "product" | "category">;
};

export type ProductLinkProps = {
	target: "product";
	productId: string;
	variantId?: string;
	href?: string;
	children?: React.ReactNode;
};

export type CategoryLinkProps = {
	target: "category";
	categoryId: string;
	href?: string;
	children?: React.ReactNode;
};

type LinkProps = SimpleLinkProps | ProductLinkProps | CategoryLinkProps;

const Link = (props: LinkProps): JSX.Element => {
	if (props.target === "product") {
		return <ProductLink {...props} />;
	}

	if (props.target === "category") {
		return <CategoryLink {...props} />;
	}

	return <SimpleLink {...props} />;
};

const SimpleLink = ({ children, ...props }: SimpleLinkProps) => (
	<a {...props}>{children}</a>
);

const ProductLink = ({ productId, href, children, target }: ProductLinkProps) => {
	const { renderProductLink } = SharedComponents.useContext();

	if (typeof renderProductLink === "function") {
		return renderProductLink({ productId, href, children, target });
	}

	return <SimpleLink href={href} target="_top">{children}</SimpleLink>;
};

const CategoryLink = ({ categoryId, href, children, target }: CategoryLinkProps) => {
	const { renderCategoryLink } = SharedComponents.useContext();

	if (typeof renderCategoryLink === "function") {
		return renderCategoryLink({ categoryId, href, children, target });
	}

	return <SimpleLink href={href} target="_top">{children}</SimpleLink>;
};

export default Link;
