"use client";
import type { CompanyStore } from "@/stores/companyStore";
import { createCompanyStore, initCompanyStore } from "@/stores/companyStore";
import { type ReactNode, createContext, useContext, useRef } from "react";
import { useStore } from "zustand";

export type CompanyStoreApi = ReturnType<typeof createCompanyStore>;

export const CompanyStoreContext = createContext<CompanyStoreApi | undefined>(
	undefined,
);

export interface CompanyStoreProviderProps {
	children: ReactNode;
}

export const CompanyStoreProvider = ({
	children,
}: CompanyStoreProviderProps) => {
	const storeRef = useRef<CompanyStoreApi>();
	if (!storeRef.current) {
		storeRef.current = createCompanyStore(initCompanyStore());
	}

	return (
		<CompanyStoreContext.Provider value={storeRef.current}>
			{children}
		</CompanyStoreContext.Provider>
	);
};

export const useCompanyStore = <T,>(
	selector: (store: CompanyStore) => T,
): T => {
	const companyStoreContext = useContext(CompanyStoreContext);

	if (!companyStoreContext) {
		throw new Error("useCompanyStore must be used within CompanyStoreProvider");
	}

	return useStore(companyStoreContext, selector);
};
