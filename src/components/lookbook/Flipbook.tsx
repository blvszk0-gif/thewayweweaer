'use client';
import React, { forwardRef } from 'react';
import HTMLFlipBook from 'react-pageflip';

// react-pageflip ma niepełne/nadmiernie rygorystyczne typy TS (wymaga
// propsów, których w praktyce nie musisz podawać) — stąd rzutowanie na `any`.
const FlipBookAny = HTMLFlipBook as any;

interface FlipbookImage {
    url: string;
    altText: string | null;
}

const Page = forwardRef<HTMLDivElement, { image?: FlipbookImage; pageNumber: number; total: number }>(
    ({ image, pageNumber, total }, ref) => (
        <div ref={ref} className="relative bg-neutral-950 flex items-center justify-center overflow-hidden">
            {image ? (
                <img
                    src={image.url}
                    alt={image.altText ?? `Strona ${pageNumber}`}
                    className="w-full h-full object-cover"
                />
            ) : (
                <div className="w-full h-full bg-neutral-900" />
            )}
            <span className="absolute bottom-3 right-4 text-[10px] font-black uppercase tracking-widest text-white/40">
                {pageNumber} / {total}
            </span>
        </div>
    )
);
Page.displayName = 'Page';

export function Flipbook({ pages }: { pages: FlipbookImage[] }) {
    if (pages.length === 0) {
        return <p className="py-20 text-center opacity-50">Ta edycja nie ma jeszcze żadnych stron.</p>;
    }

    return (
        <div className="flex justify-center">
            <FlipBookAny
                width={380}
                height={520}
                size="stretch"
                minWidth={280}
                maxWidth={600}
                minHeight={400}
                maxHeight={820}
                maxShadowOpacity={0.5}
                showCover={true}
                mobileScrollSupport={true}
                drawShadow={true}
                flippingTime={700}
                usePortrait={true}
                autoSize={true}
                useMouseEvents={true}
                swipeDistance={30}
                showPageCorners={true}
                className="shadow-2xl"
            >
                {pages.map((page, i) => (
                    <Page key={i} image={page} pageNumber={i + 1} total={pages.length} />
                ))}
            </FlipBookAny>
        </div>
    );
}