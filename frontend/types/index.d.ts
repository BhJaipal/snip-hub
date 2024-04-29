import type { Link as ULink, Badge } from "@nuxt/ui/dist/runtime/types";

export interface NavItem {
	title: string;
	_path: string;
	_id?: string;
	_draft?: boolean;
	children?: NavItem[];
	[key: string]: any;
}

export interface Link extends ULink {
	label: string;
	class?: string;
	click?: Function;
	to?: string;
}

export interface NavigationLink extends Link {
	icon?: string;
	iconClass?: string;
	badge?: string | Badge;
}

export interface NavigationGroup {
	type?: "link" | "accordion";
	defaultOpen?: boolean;
	children: NavigationTree[];
}

export interface NavigationTree extends NavigationLink {
	children?: NavigationTree[];
}
