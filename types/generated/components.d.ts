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
    linkUrl: Attribute.String;
    linkText: Attribute.String;
  };
}

export interface MiscTags extends Schema.Component {
  collectionName: 'components_misc_tags';
  info: {
    displayName: 'tags';
    description: '';
  };
  attributes: {
    value: Attribute.String & Attribute.Required;
    showTitle: Attribute.Boolean & Attribute.DefaultTo<true>;
    icon: Attribute.String & Attribute.CustomField<'plugin::react-icons.icon'>;
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
    topBorder: Attribute.Enumeration<['None', 'Light']> &
      Attribute.Required &
      Attribute.DefaultTo<'None'>;
    bottomBorder: Attribute.Enumeration<['None', 'Light']> &
      Attribute.Required &
      Attribute.DefaultTo<'None'>;
  };
}

export interface MiscMedia extends Schema.Component {
  collectionName: 'components_misc_media';
  info: {
    displayName: 'images';
    icon: 'dashboard';
    description: '';
  };
  attributes: {
    images: Attribute.Media<'images', true> & Attribute.Required;
    theme: Attribute.Enumeration<
      ['List', 'Simple grid', 'Bento grid', 'Carousel']
    > &
      Attribute.Required &
      Attribute.DefaultTo<'Simple grid'>;
    beforeText: Attribute.Boolean &
      Attribute.Required &
      Attribute.DefaultTo<false>;
    alignX: Attribute.Enumeration<['Left', 'Center', 'Right']> &
      Attribute.Required &
      Attribute.DefaultTo<'Center'>;
    alignY: Attribute.Enumeration<['Top', 'Center', 'Bottom']> &
      Attribute.Required &
      Attribute.DefaultTo<'Top'>;
    onMobile: Attribute.Boolean &
      Attribute.Required &
      Attribute.DefaultTo<true>;
    onTablet: Attribute.Boolean &
      Attribute.Required &
      Attribute.DefaultTo<true>;
    onDesktop: Attribute.Boolean &
      Attribute.Required &
      Attribute.DefaultTo<true>;
    overlapY: Attribute.Boolean &
      Attribute.Required &
      Attribute.DefaultTo<false>;
    size: Attribute.Enumeration<['Small', 'Medium', 'Large']> &
      Attribute.Required &
      Attribute.DefaultTo<'Medium'>;
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

export interface MiscButtons extends Schema.Component {
  collectionName: 'components_misc_buttons';
  info: {
    displayName: 'buttons';
    icon: 'cog';
    description: '';
  };
  attributes: {
    text: Attribute.String;
    theme: Attribute.Enumeration<['default', 'primary']> &
      Attribute.Required &
      Attribute.DefaultTo<'default'>;
    action: Attribute.String;
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
    theme: Attribute.Enumeration<['Theme 1', 'Theme 2', 'Theme 3']> &
      Attribute.Required &
      Attribute.DefaultTo<'Theme 1'>;
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
    images: Attribute.Component<'misc.media'>;
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
    filterTabs: Attribute.Enumeration<['All', 'Positions', 'Candidates']> &
      Attribute.Required &
      Attribute.DefaultTo<'All'>;
  };
}

export interface BlocksJobHeader extends Schema.Component {
  collectionName: 'components_blocks_job_headers';
  info: {
    displayName: 'jobHeader';
    icon: 'briefcase';
    description: '';
  };
  attributes: {
    baseSettings: Attribute.Component<'misc.settings'>;
    tags: Attribute.Component<'misc.tags', true>;
    centered: Attribute.Boolean & Attribute.DefaultTo<false>;
    buttons: Attribute.Component<'misc.buttons', true>;
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

export interface BlocksHeader extends Schema.Component {
  collectionName: 'components_blocks_headers';
  info: {
    displayName: 'header';
    icon: 'layer';
    description: '';
  };
  attributes: {
    text: Attribute.String & Attribute.Required;
    baseSettings: Attribute.Component<'misc.settings'>;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'misc.tile': MiscTile;
      'misc.tags': MiscTags;
      'misc.settings': MiscSettings;
      'misc.media': MiscMedia;
      'misc.hero-slide': MiscHeroSlide;
      'misc.buttons': MiscButtons;
      'blocks.tiles': BlocksTiles;
      'blocks.text': BlocksText;
      'blocks.jobs-list': BlocksJobsList;
      'blocks.job-header': BlocksJobHeader;
      'blocks.hero-image': BlocksHeroImage;
      'blocks.header': BlocksHeader;
    }
  }
}
