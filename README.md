# Projeto de Computação Gráfica (IFSP) — Three.js

<img width="1918" height="943" alt="image" src="https://github.com/user-attachments/assets/ff953b0e-020b-4fb9-aacc-df6782311f51" />

## Descrição

O projeto consiste em um ambiente tridimensional interativo com a temática de um acampamento noturno em uma floresta. O jogador controla uma raposa e explora o cenário utilizando uma câmera em terceira pessoa.

## Funcionalidades

- Movimentação e rotação da raposa pelo teclado, utilizando delta time para independência da taxa de quadros (FPS).
- Câmera em terceira pessoa que acompanha a posição e a rotação da raposa.
- Animações de repouso e caminhada utilizando `AnimationMixer`.
- Iluminação ambiente, direcional e pontual, com projeção de sombras.
- Importação de modelos tridimensionais nos formatos GLTF e OBJ.
- Aplicação de texturas e materiais aos modelos.
- Interface gráfica de diagnóstico utilizando lil-gui.

## Controles

| Tecla | Ação |
| --- | --- |
| W ou ↑ | Avançar |
| S ou ↓ | Recuar |
| A ou ← | Girar à esquerda |
| D ou → | Girar à direita |

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

## Como executar

É necessário possuir o Node.js e o npm instalados. Na pasta do projeto, execute:

```bash
npm install
npm run dev
```

## Nota de Transparência de IA
A Inteligência Artificial foi utilizada para auxiliar no processo de desenvolvimento deste projeto. No entanto, os códigos foram revisados, reestruturados e corrigidos para atender às necessidades reais da equipe.
