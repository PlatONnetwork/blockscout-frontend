import { Flex, chakra } from '@chakra-ui/react';
import _omit from 'lodash/omit';
import React from 'react';

import { route } from 'nextjs-routes';

import * as EntityBase from 'ui/shared/entities/base/components';

import AddressIdenticon from '../address/AddressIdenticon';
import { getIconProps } from '../base/utils';

type LinkProps = EntityBase.LinkBaseProps & Pick<EntityProps, 'hash'>;

const Link = chakra((props: LinkProps) => {
  const defaultHref = route({ pathname: '/validator/[hash]', query: { hash: props.hash } });

  return (
    <EntityBase.Link
      { ...props }
      href={ props.href ?? defaultHref }
    >
      { props.children }
    </EntityBase.Link>
  );
});

type IconProps = Omit<EntityBase.IconBaseProps, 'name'> & Pick<EntityProps, 'hash'> & {
  name?: EntityBase.IconBaseProps['name'];
};

const Icon = (props: IconProps) => {
  const styles = {
    ...getIconProps(props.iconSize),
    marginRight: 2,
  };
  return (
    <Flex marginRight={ styles.marginRight }>
      <AddressIdenticon
        size={ props.iconSize === 'lg' ? 30 : 20 }
        hash={ props.hash }
      />
    </Flex>
  );
};

type ContentProps = Omit<EntityBase.ContentBaseProps, 'text'> & Pick<EntityProps, 'hash' | 'text'>;

const Content = chakra((props: ContentProps) => {
  return (
    <EntityBase.Content
      { ...props }
      text={ props.text ?? props.hash }
    />
  );
});

type CopyProps = Omit<EntityBase.CopyBaseProps, 'text'> & Pick<EntityProps, 'hash'>;

const Copy = (props: CopyProps) => {
  return (
    <EntityBase.Copy
      { ...props }
      text={ props.hash }
      noCopy={ props.noCopy ?? false }
    />
  );
};

const Container = EntityBase.Container;

export interface EntityProps extends EntityBase.EntityBaseProps {
  hash: string;
  text?: string;
}

const ValidatorEntity = (props: EntityProps) => {
  const linkProps = _omit(props, [ 'className' ]);
  const partsProps = _omit(props, [ 'className', 'onClick' ]);

  return (
    <Container className={ props.className }>
      <Icon { ...partsProps } name={ props.iconName } color={ props.iconColor }/>
      <Link { ...linkProps }>
        <Content { ...partsProps }/>
      </Link>
      <Copy { ...partsProps }/>
    </Container>
  );
};

export default React.memo(chakra(ValidatorEntity));

export {
  Container,
  Link,
  Icon,
  Content,
  Copy,
};
