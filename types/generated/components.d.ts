import type { Schema, Attribute } from '@strapi/strapi';

export interface MiscTile extends Schema.Component {
  collectionName: 'components_misc_tiles';
  info: {
    displayName: 'tile';
    icon: 'grid';
    description: '';
  };
  attributes: {
    header: Attribute.String;
    icon: Attribute.String & Attribute.CustomField<'plugin::react-icons.icon'>;
    text: Attribute.RichText &
      Attribute.CustomField<'plugin::tiptap-editor.tiptap-editor'>;
  };
}

export interface MiscSettings extends Schema.Component {
  collectionName: 'components_misc_settings';
  info: {
    displayName: 'baseSettings';
    icon: 'cog';
    description: '';
  };
  attributes: {
    background: Attribute.Enumeration<
      ['Transparent', 'White', 'Light', 'Dark', 'Brand']
    > &
      Attribute.Required &
      Attribute.DefaultTo<'Transparent'>;
    topGap: Attribute.Enumeration<['None', 'Small', 'Medium', 'Large']> &
      Attribute.Required &
      Attribute.DefaultTo<'Medium'>;
    bottomGap: Attribute.Enumeration<['None', 'Small', 'Medium', 'Large']> &
      Attribute.Required &
      Attribute.DefaultTo<'Medium'>;
    backgroundImage: Attribute.Media<'images'>;
    backgroundPosition: Attribute.Enumeration<
      [
        'TopLeft',
        'TopCenter',
        'TopRight',
        'CenterLeft',
        'Center',
        'CenterRight',
        'BottomLeft',
        'BottomCenter',
        'BottomRight'
      ]
    > &
      Attribute.DefaultTo<'Center'>;
    backgroundRepeat: Attribute.Enumeration<
      ['NoRepeat', 'Repeat', 'RepeatX', 'RepeatY']
    > &
      Attribute.DefaultTo<'NoRepeat'>;
    backgroundSize: Attribute.Enumeration<['Auto', 'Cover', 'Contain']>;
  };
}

export interface MiscHeroSlide extends Schema.Component {
  collectionName: 'components_misc_hero_slides';
  info: {
    displayName: 'Carousel slide';
    icon: 'picture';
    description: '';
  };
  attributes: {
    header: Attribute.String;
    description: Attribute.Text;
    image: Attribute.Media<'images'> & Attribute.Required;
    textBackground: Attribute.Enumeration<['None', 'White', 'Black']> &
      Attribute.Required &
      Attribute.DefaultTo<'None'>;
    textAlignX: Attribute.Enumeration<['Left', 'Center', 'Right']> &
      Attribute.Required &
      Attribute.DefaultTo<'Left'>;
    textAlignY: Attribute.Enumeration<['Top', 'Center', 'Bottom']> &
      Attribute.Required &
      Attribute.DefaultTo<'Bottom'>;
    buttonName: Attribute.String;
    buttonLink: Attribute.String;
    textColor: Attribute.Enumeration<['White', 'Black']> &
      Attribute.Required &
      Attribute.DefaultTo<'White'>;
  };
}

export interface BlocksTiles extends Schema.Component {
  collectionName: 'components_blocks_tiles';
  info: {
    displayName: 'Tiles';
    icon: 'apps';
    description: '';
  };
  attributes: {
    baseSettings: Attribute.Component<'misc.settings'>;
    tiles: Attribute.Component<'misc.tile', true>;
  };
}

export interface BlocksText extends Schema.Component {
  collectionName: 'components_blocks_texts';
  info: {
    displayName: 'Text';
    icon: 'file';
    description: '';
  };
  attributes: {
    text: Attribute.RichText &
      Attribute.CustomField<'plugin::tiptap-editor.tiptap-editor'>;
    baseSettings: Attribute.Component<'misc.settings'>;
    boxed: Attribute.Boolean & Attribute.DefaultTo<false>;
    centered: Attribute.Boolean & Attribute.DefaultTo<true>;
    width: Attribute.Enumeration<['Small', 'Medium', 'Large', 'Full']>;
  };
}

export interface BlocksJobsList extends Schema.Component {
  collectionName: 'components_blocks_jobs_lists';
  info: {
    displayName: 'Jobs list';
    icon: 'apps';
    description: '';
  };
  attributes: {
    showFilter: Attribute.Boolean & Attribute.DefaultTo<true>;
    showSubmitButton: Attribute.Boolean & Attribute.DefaultTo<false>;
    baseSettings: Attribute.Component<'misc.settings'>;
  };
}

export interface BlocksHeroImage extends Schema.Component {
  collectionName: 'components_blocks_hero_images';
  info: {
    displayName: 'Carousel';
    icon: 'picture';
    description: '';
  };
  attributes: {
    autoplay: Attribute.Boolean &
      Attribute.Required &
      Attribute.DefaultTo<false>;
    showProgress: Attribute.Boolean & Attribute.DefaultTo<true>;
    baseSettings: Attribute.Component<'misc.settings'>;
    slides: Attribute.Component<'misc.hero-slide', true>;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'misc.tile': MiscTile;
      'misc.settings': MiscSettings;
      'misc.hero-slide': MiscHeroSlide;
      'blocks.tiles': BlocksTiles;
      'blocks.text': BlocksText;
      'blocks.jobs-list': BlocksJobsList;
      'blocks.hero-image': BlocksHeroImage;
    }
  }
}
