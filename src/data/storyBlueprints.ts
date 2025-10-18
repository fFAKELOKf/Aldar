import type { StoryBlueprint } from "../types/story";

export const storyBlueprints: StoryBlueprint[] = [
  {
    id: "cunning-bai-trade",
    title: "Хитрый обман бая",
    prompt:
      "Алдар Косе приходит на базар и видит богатого бая, который хвастается своим богатством. Алдар предлагает баю выгодную сделку на его старого коня. Бай соглашается, думая, что обманывает хитреца. Алдар уезжает на лучшем коне бая, оставив его с дряхлой лошадью.",
    summary:
      "Алдар Косе использует свое остроумие, чтобы устроить обмен, в котором высокомерный бай сам дарит ему лучшего коня.",
    themeKeywords: ["бай", "богат", "конь", "торговец", "базар", "сделка"],
    storyboardImage:
      "https://images.unsplash.com/photo-1626513507309-d67e162e0658?auto=format&fit=crop&w=1080&q=80",
    frames: [
      {
        thumbnail:
          "https://images.unsplash.com/photo-1562236457-bdc2bec633cb?auto=format&fit=crop&w=1080&q=80",
        caption: "Алдар Косе прибывает на оживленный базар, где богатый бай хвастается перед толпой.",
      },
      {
        thumbnail:
          "https://images.unsplash.com/photo-1669012520437-5102e3fd4589?auto=format&fit=crop&w=1080&q=80",
        caption: "Бай демонстрирует своё богатство и лучших коней, привлекая внимание зевак.",
      },
      {
        thumbnail:
          "https://images.unsplash.com/photo-1728300250509-f7b954491905?auto=format&fit=crop&w=1080&q=80",
        caption: "Алдар предлагает сделку и ловко убеждает бая обменяться лошадьми.",
      },
      {
        thumbnail:
          "https://images.unsplash.com/photo-1629818986721-23061616633f?auto=format&fit=crop&w=1080&q=80",
        caption: "На закате Алдар уезжает на лучшем коне, а бай остаётся с дряхлой лошадью.",
      },
    ],
  },
  {
    id: "wisdom-versus-greed",
    title: "Мудрость против жадности",
    prompt:
      "Торговец на рынке отказывается дать еду голодному путнику. Алдар Косе подходит и предлагает сделку — он расскажет три мудрости за обед. Торговец соглашается из любопытства. После еды Алдар рассказывает очевидные истины, и торговец понимает, что его перехитрили.",
    summary:
      "Вместо золота Алдар расплачивается мудростью, превращая урок доброты в остроумную победу над жадностью.",
    themeKeywords: ["торговец", "еда", "обед", "мудрость", "урок", "жадный"],
    storyboardImage:
      "https://images.unsplash.com/photo-1760113671986-63ccb46ae202?auto=format&fit=crop&w=1080&q=80",
    frames: [
      {
        thumbnail:
          "https://images.unsplash.com/photo-1690323027409-ba9c96ae1c7d?auto=format&fit=crop&w=1080&q=80",
        caption: "Голодный путник просит еды у торговца, но получает отказ.",
      },
      {
        thumbnail:
          "https://images.unsplash.com/photo-1642520312867-3b13e53c9bad?auto=format&fit=crop&w=1080&q=80",
        caption: "Алдар предлагает сделку: он поделится мудростью в обмен на обед.",
      },
      {
        thumbnail:
          "https://images.unsplash.com/photo-1722252799903-797424adcd2d?auto=format&fit=crop&w=1080&q=80",
        caption: "Торговец накрывает щедрый стол, ожидая услышать великие тайны.",
      },
      {
        thumbnail:
          "https://images.unsplash.com/photo-1760420910499-f7e2bc16bd2d?auto=format&fit=crop&w=1080&q=80",
        caption: "Простые истины Алдара смущают торговца, и он понимает свой урок.",
      },
    ],
  },
  {
    id: "song-of-the-steppe",
    title: "Песня степного акина",
    prompt:
      "В ауле проводится состязание акинов. Алдар Косе выходит на импровизированную сцену, чтобы спеть о жадном сборщике налогов. Толпа восторженно смеётся, а чиновник понимает, что стал объектом насмешек и отказывается от поборов.",
    summary:
      "Алдар превращает народное состязание в сцену правды, где юмор и песня защищают простых людей.",
    themeKeywords: ["акин", "песня", "аул", "чиновник", "налог", "смех", "музыка"],
    storyboardImage:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1080&q=80",
    frames: [
      {
        thumbnail:
          "https://images.unsplash.com/photo-1526481280695-3c469d76d32d?auto=format&fit=crop&w=1080&q=80",
        caption: "В ауле собирается толпа, чтобы послушать соревнование акинов.",
      },
      {
        thumbnail:
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1080&q=80",
        caption: "Алдар Косе выходит с домброй и начинает задорную песню о чиновнике.",
      },
      {
        thumbnail:
          "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1080&q=80",
        caption: "Толпа смеётся и поддерживает Алдара, наслаждаясь искромётной импровизацией.",
      },
      {
        thumbnail:
          "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=1080&q=80",
        caption: "Чиновник краснеет и отказывается от поборов под давлением общественного мнения.",
      },
    ],
  },
];
