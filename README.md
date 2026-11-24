# Projeto de Computação Gráfica (IFSP) — Three.js

<img width="1918" height="943" alt="image" src="https://github.com/user-attachments/assets/ff953b0e-020b-4fb9-aacc-df6782311f51" />

## Descrição

O projeto consiste em um ambiente tridimensional interativo com a temática de um acampamento noturno em uma floresta. O jogador controla uma raposa e explora o cenário utilizando uma câmera em terceira pessoa.

## Instruções de Execução

É necessário possuir o Node.js e o npm instalados. Na pasta do projeto, execute:

```bash
npm install
npm run dev
```
## Controles

| Tecla | Ação |
| --- | --- |
| W ou ↑ | Avançar |
| S ou ↓ | Recuar |
| A ou ← | Girar à esquerda |
| D ou → | Girar à direita |

## Créditos

### Acampamento

Model Information:
* title:	Campsite
* source:	https://sketchfab.com/3d-models/campsite-ac3be1fb11714bdb90b59d324c1917d5
* author:	iggymodels (https://sketchfab.com/iggymodels)

### Floresta

Model Information:
* title:	low poly Forest // Лоу поли лес
* source:	https://sketchfab.com/3d-models/low-poly-forest-aa9226a9f5d14d9ba016f1cf203e201e
* author:	kyut.egor (https://sketchfab.com/kyut.egor)

### Raposa

Model Information:
* title:	Fox
* source:	https://sketchfab.com/3d-models/fox-f372c04de44640fbb6a4f9e4e5845c78
* author:	victory_mirosya (https://sketchfab.com/victory_mirosya)

### Céu

Model Information:
* title:	[Extracted] Minecraft Java Edition's Stars
* source:	https://sketchfab.com/3d-models/extracted-minecraft-java-editions-stars-c8868b7ffc4a473eb5cd9203a59e3650
* author:	AjaxGb (https://sketchfab.com/ajaxgb)

## Funcionalidades

- Movimentação e rotação da raposa pelo teclado, utilizando delta time para independência da taxa de quadros (FPS).
- Câmera em terceira pessoa que acompanha a posição e a rotação da raposa.
- Animações de repouso e caminhada utilizando `AnimationMixer`.
- Iluminação ambiente, direcional e pontual, com projeção de sombras.
- Importação de modelos tridimensionais nos formatos GLTF e OBJ.
- Aplicação de texturas e materiais aos modelos.
- Interface gráfica de diagnóstico utilizando lil-gui.

## Modo diagnóstico

A interface de diagnóstico permite controlar os seguintes recursos:

- **Wireframe:** visualização das arestas das malhas tridimensionais.
- **Modo profundidade:** representação visual da profundidade dos objetos utilizando `MeshDepthMaterial`.
- **Back-face culling:** controle da renderização das faces posteriores.
- **Frustum culling:** descarte manual de objetos fora do volume de visualização da câmera principal.
- **Frustum helper:** representação visual do volume de visualização da câmera.
- **Viewport dividida:** exibição simultânea da câmera principal e de uma câmera fixa de observação.
- **Estatísticas:** acompanhamento da quantidade de draw calls e triângulos renderizados.

## Tecnologias utilizadas

- JavaScript
- Three.js
- WebGL
- Vite
- lil-gui
- GLTFLoader, OBJLoader e MTLLoader

## Decisões técnicas

**Luzes:** Foram utilizadas luzes com o intuito de auxiliar na imersão do espectador à experiência, como exemplo nas luzes do ambiente do acampamento, onde foram posicionadas ***Point Lights*** de cores quentes para simular a luz de uma fogueira.

**Sombras:** Os parâmetros definidos para as sombras levaram em consideração a cena se passar durante a noite, com projeções bem definidas no chão.

**Câmera:** Foi utilizado uma ***Câmera de Perspectiva***, colocada acima do modelo da raposa e configurada para seguir os seus movimentos

## Divisão do Trabalho

| Integrante | Etapa do Trabalho |
| --- | --- |
| Eduardo Santana | M0 |
| Rogério Castro | M1 |
| Davi Paulino | M2 |
| Rogério Castro | M3 |
| Eduardo Santana | M4 |

## Nota de Transparência de IA
A Inteligência Artificial foi utilizada para auxiliar no processo de desenvolvimento deste projeto. No entanto, os códigos foram revisados, reestruturados e corrigidos para atender às necessidades reais da equipe.
