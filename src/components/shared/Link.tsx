import React from "../../../react";

import SharedComponents from "../SharedComponents";

const Spread = ({ props, children }: { props: React.PropsWithChildren<any>, children: React.ReactElement }) => {
	return React.cloneElement(children, { ...props });
};

type CustomTarget = "_self" | "_blank" | "_parent" | "_top" | "product" | "category";

export type SimpleLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
	target?: Exclude<CustomTarget, "product" | "category">;
};

export type ProductLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
	target: "product";
	productId: string;
	variantId?: string;
	href?: string;
	children?: React.ReactNode;
};

export type CategoryLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
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

const ProductLink = ({ productId, href, children, target, ...props }: ProductLinkProps) => {
	const { renderProductLink } = SharedComponents.useContext();

	if (typeof renderProductLink === "function") {
		return <Spread props={props}>{renderProductLink({ productId, href, children, target })}</Spread>;
	}

	return <SimpleLink href={href} target="_top" {...props}>{children}</SimpleLink>;
};

const CategoryLink = ({ categoryId, href, children, target, ...props }: CategoryLinkProps) => {
	const { renderCategoryLink } = SharedComponents.useContext();

	if (typeof renderCategoryLink === "function") {
		return <Spread props={props}>{renderCategoryLink({ categoryId, href, children, target })}</Spread>;
	}

	return <SimpleLink href={href} target="_top" {...props}>{children}</SimpleLink>;
};

export default Link;
