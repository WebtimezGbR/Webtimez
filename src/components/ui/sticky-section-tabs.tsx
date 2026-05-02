"use client"

import React, { Children, isValidElement } from 'react';
import clsx from 'clsx';

interface StickyTabItemProps {
  title: string;
  id: string | number;
  children: React.ReactNode;
}

const StickyTabItem: React.FC<StickyTabItemProps> = () => {
  return null;
};

interface StickyTabsProps {
  children: React.ReactNode;
  mainNavHeight?: string;
  rootClassName?: string;
  navSpacerClassName?: string;
  sectionClassName?: string;
  stickyHeaderContainerClassName?: string;
  headerContentWrapperClassName?: string;
  headerContentLayoutClassName?: string;
  titleClassName?: string;
  contentLayoutClassName?: string;
}

const StickyTabs: React.FC<StickyTabsProps> & { Item: React.FC<StickyTabItemProps> } = ({
  children,
  mainNavHeight = '4em',
  rootClassName = "text-white",
  navSpacerClassName = "border-b border-white/10",
  sectionClassName = "bg-white/5 backdrop-blur-sm",
  stickyHeaderContainerClassName = "shadow-lg",
  headerContentWrapperClassName = "border-b border-t border-white/10 bg-black/30 backdrop-blur-md",
  headerContentLayoutClassName = "mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8",
  titleClassName = "my-0 text-2xl font-medium leading-none md:text-3xl lg:text-4xl",
  contentLayoutClassName = "mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8",
}) => {
  const navHeightStyle = { height: mainNavHeight };
  const headerHeight = 58;

  return (
    <div className={clsx("overflow-clip", rootClassName)}>
      <div
        className={clsx(
          "sticky left-0 top-0 z-20 w-full",
          navSpacerClassName
        )}
        style={navHeightStyle}
        aria-hidden="true"
      />

      {Children.map(children, (child, childIndex) => {
        if (!isValidElement(child) || child.type !== StickyTabItem) {
          return null;
        }

        const itemElement = child as React.ReactElement<StickyTabItemProps>;
        const { title, id, children: itemContent } = itemElement.props;

        const stackedTop = `calc(${mainNavHeight} + ${childIndex * headerHeight}px)`;

        return (
          <section
            key={id}
            className={clsx(
              "relative overflow-clip",
              sectionClassName
            )}
          >
            <div
              className={clsx(
                "sticky -mt-px flex flex-col",
                stickyHeaderContainerClassName
              )}
              style={{ top: stackedTop, zIndex: 10 + childIndex }}
            >
              <div className={clsx(headerContentWrapperClassName)}>
                <div className={clsx(headerContentLayoutClassName)}>
                  <div className="flex items-center justify-between">
                    <h2 className={clsx(titleClassName)}>
                      {title}
                    </h2>
                  </div>
                </div>
              </div>
            </div>

            <div className={clsx(contentLayoutClassName)}>
              {itemContent}
            </div>
          </section>
        );
      })}
    </div>
  );
};

StickyTabs.Item = StickyTabItem;

export default StickyTabs;
