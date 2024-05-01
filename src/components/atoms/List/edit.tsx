import { BlockEditProps } from '@wordpress/blocks';
import { createHigherOrderComponent } from '@wordpress/compose';
import { ComponentType } from 'react';

// internal imports
import { WpFilterType } from '@/typings';

import block from './block.json';

// styles
import './styles.css';

/**
 * Add custom className to core/list block
 */
const withCustomClassName = createHigherOrderComponent(
	(BlockListBlock: ComponentType<any>) => {
		const EnhancedComponent = (props: BlockEditProps<any>) => {
			if ((props as any).name !== block.slug)
				return <BlockListBlock {...props} />;

			return (
				<BlockListBlock
					{...props}
					className="supt-list"
					style={{
						counterSet: props.attributes.start
							? `li ${props.attributes.start + 1}`
							: null,
					}}
				/>
			);
		};

		return EnhancedComponent;
	},
	'withCustomClassName'
);

export const ListEditBlockClassName: WpFilterType = {
	hook: 'editor.BlockListBlock',
	namespace: 'starterpack/list',
	callback: withCustomClassName,
};

export const ListBlock = {
	slug: block.slug,
};
