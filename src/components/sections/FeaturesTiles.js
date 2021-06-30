import React from 'react';
import classNames from 'classnames';
import { SectionTilesProps } from '../../utils/SectionProps';
import SectionHeader from './partials/SectionHeader';
import Image from '../elements/Image';

const propTypes = {
  ...SectionTilesProps.types
}

const defaultProps = {
  ...SectionTilesProps.defaults
}
const FeaturesTiles = ({
  className,
  topOuterDivider,
  bottomOuterDivider,
  topDivider,
  bottomDivider,
  hasBgColor,
  invertColor,
  pushLeft,
  ...props
}) => {

  const outerClasses = classNames(
    'features-tiles section',
    topOuterDivider && 'has-top-divider',
    bottomOuterDivider && 'has-bottom-divider',
    hasBgColor && 'has-bg-color',
    invertColor && 'invert-color',
    className
  );

  const innerClasses = classNames(
    'features-tiles-inner section-inner pt-0',
    topDivider && 'has-top-divider',
    bottomDivider && 'has-bottom-divider'
  );

  const tilesClasses = classNames(
    'tiles-wrap ',
    pushLeft && 'push-left'
  );

  const sectionHeader = {
    title: 'Champagne',
  };

  const entries = [1, 1, 2 , 2]

  return (
    <section
      {...props}
      className={outerClasses}
    >
      <div className="container">
        <div className={innerClasses}>
         
          <SectionHeader data={sectionHeader} className="" />
          <div className={tilesClasses}>

          {entries.map((name, index) => {
            return <div className="tiles-item reveal-from-bottom">
                <div className="tiles-item-inner">
                  <div className="features-tiles-item-header">
                    <div className="features-tiles-item-image mb-16">
                    </div>
                  </div>
                  <div className="features-tiles-item-content">
                    <h4 className="mt-0 mb-8">Champagne Dehours</h4>
                    <p className="m-0 text-xs">
                    Assurément un des plus grands champagnes de la Vallée de la Marne. Jérôme Dehours vinifie des vins
                    singuliers à la bourguignonne (42 parcelles répertoriées). Les vins clairs sont élevés en barrique de
                    plusieurs vins ajoutant une étoffe supplémentaire au champagne. Quelques bouteilles de l’immense
                    millésime 2012 sont disponibles pour mettre en cave (2012 en champagne tiendra dans les 50
                    prochaines années). Au domaine, le cépage phare est le Pinot Meunier qui est travaillé en Soléra* pour
                    la grande réserve. Privilégier les verres à vin pour le service, servir frais 9°C/10°C mais pas froid 5°.
                    *Soléra : La solera, appelée aussi réserve perpétuelle, est une méthode d'assemblage et d'élevage du
                    vin pratiquée en particulier en Espagne. Ce procédé est aussi utilisé aujourd'hui dans la production de
                    certains champagnes.
                      </p>
                  </div>
                </div>
              </div>
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

FeaturesTiles.propTypes = propTypes;
FeaturesTiles.defaultProps = defaultProps;

export default FeaturesTiles;