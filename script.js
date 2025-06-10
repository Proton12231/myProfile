// DOM元素加载完成后执行
document.addEventListener("DOMContentLoaded", function () {
  // 初始化主题
  initTheme();

  // 初始化网站运行时间和访客数
  initSiteStats();

  // 初始化弹窗功能
  initModals();

  // 初始化提示框功能
  initToasts();

  // 初始化移动端导航
  initMobileNav();

  // 初始化胶囊导航
  initCapsuleNav();

  // 初始化技能进度条动画
  initSkillsAnimation();

  // 初始化后台管理相关功能
  if (document.querySelector(".admin-body")) {
    initAdminFeatures();
  }
});

// 主题切换功能
function initTheme() {
  const themeToggle = document.querySelector(".theme-toggle");
  const mobileThemeToggle = document.getElementById("mobile-theme-toggle");
  const capsuleThemeToggle = document.getElementById("theme-toggle-capsule");

  // 检查本地存储中的主题设置
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
    if (themeToggle) themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    if (mobileThemeToggle)
      mobileThemeToggle.innerHTML =
        '<i class="fas fa-sun"></i><span>亮色模式</span>';
    if (capsuleThemeToggle)
      capsuleThemeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  }

  // 点击切换主题 - 桌面版
  if (themeToggle) {
    themeToggle.addEventListener("click", toggleTheme);
  }

  // 点击切换主题 - 移动版
  if (mobileThemeToggle) {
    mobileThemeToggle.addEventListener("click", function (e) {
      e.preventDefault();
      toggleTheme();
    });
  }

  // 点击切换主题 - 胶囊导航
  if (capsuleThemeToggle) {
    capsuleThemeToggle.addEventListener("click", function (e) {
      e.preventDefault();
      toggleTheme();
    });
  }

  // 主题切换函数
  function toggleTheme() {
    if (document.documentElement.getAttribute("data-theme") === "dark") {
      document.documentElement.removeAttribute("data-theme");
      localStorage.setItem("theme", "light");
      if (themeToggle) themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
      if (mobileThemeToggle)
        mobileThemeToggle.innerHTML =
          '<i class="fas fa-moon"></i><span>暗黑模式</span>';
      if (capsuleThemeToggle)
        capsuleThemeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    } else {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
      if (themeToggle) themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
      if (mobileThemeToggle)
        mobileThemeToggle.innerHTML =
          '<i class="fas fa-sun"></i><span>亮色模式</span>';
      if (capsuleThemeToggle)
        capsuleThemeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
  }
}

// 初始化网站统计信息
function initSiteStats() {
  const runningDaysEl = document.getElementById("running-days");
  const visitorCountEl = document.getElementById("visitor-count");
  const mobileRunningDaysEl = document.getElementById("mobile-running-days");
  const mobileVisitorCountEl = document.getElementById("mobile-visitor-count");

  if (
    !runningDaysEl &&
    !visitorCountEl &&
    !mobileRunningDaysEl &&
    !mobileVisitorCountEl
  )
    return;

  // 网站创建日期（示例）
  const startDate = new Date("2023-01-01");
  const today = new Date();
  const diffTime = Math.abs(today - startDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (runningDaysEl) {
    runningDaysEl.textContent = diffDays;
  }

  // 同步更新移动端运行天数
  if (mobileRunningDaysEl) {
    mobileRunningDaysEl.textContent = diffDays;
  }

  // 访客数（示例，实际应从服务器获取）
  // 从本地存储获取访客数，模拟增加
  let count = parseInt(localStorage.getItem("visitorCount") || "0");
  // 每次访问增加1-3的随机数
  count += Math.floor(Math.random() * 3) + 1;
  localStorage.setItem("visitorCount", count.toString());

  if (visitorCountEl) {
    visitorCountEl.textContent = count;
  }

  // 同步更新移动端访客数
  if (mobileVisitorCountEl) {
    mobileVisitorCountEl.textContent = count;
  }
}

// 初始化弹窗功能
function initModals() {
  // 获取所有弹窗和触发按钮
  const modals = document.querySelectorAll(".modal");
  const modalTriggers = document.querySelectorAll("[data-modal]");
  const closeBtns = document.querySelectorAll(
    ".close-btn, .modal .btn-secondary"
  );

  // 点击打开弹窗
  modalTriggers.forEach((trigger) => {
    trigger.addEventListener("click", function () {
      const modalId = this.getAttribute("data-modal");
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.classList.add("active");
        document.body.style.overflow = "hidden"; // 防止背景滚动
      }
    });
  });

  // 特殊处理：新建动态按钮
  const newMomentBtn = document.getElementById("new-moment-btn");
  if (newMomentBtn) {
    newMomentBtn.addEventListener("click", function () {
      const modal = document.getElementById("moment-modal");
      if (modal) {
        modal.classList.add("active");
        document.body.style.overflow = "hidden";
      }
    });
  }

  // 点击关闭弹窗
  closeBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const modal = this.closest(".modal");
      if (modal) {
        modal.classList.remove("active");
        document.body.style.overflow = "";
      }
    });
  });

  // 点击弹窗外部关闭
  modals.forEach((modal) => {
    modal.addEventListener("click", function (e) {
      if (e.target === this) {
        this.classList.remove("active");
        document.body.style.overflow = "";
      }
    });
  });
}

// 初始化提示框功能
function initToasts() {
  // 提示框功能
  window.showToast = function (message, type = "success") {
    const toast = document.getElementById("toast");
    const toastMessage = toast.querySelector(".toast-message");
    const toastIcon = toast.querySelector(".toast-icon");

    // 设置消息内容
    toastMessage.textContent = message;

    // 根据类型设置图标和样式
    switch (type) {
      case "success":
        toastIcon.className = "fas fa-check-circle toast-icon";
        toast.querySelector(".toast-content").style.backgroundColor =
          "var(--primary-color)";
        break;
      case "error":
        toastIcon.className = "fas fa-times-circle toast-icon";
        toast.querySelector(".toast-content").style.backgroundColor =
          "var(--secondary-color)";
        break;
      case "warning":
        toastIcon.className = "fas fa-exclamation-circle toast-icon";
        toast.querySelector(".toast-content").style.backgroundColor = "#f59e0b";
        break;
      case "info":
        toastIcon.className = "fas fa-info-circle toast-icon";
        toast.querySelector(".toast-content").style.backgroundColor = "#3b82f6";
        break;
    }

    // 显示提示框
    toast.classList.add("active");

    // 3秒后自动关闭
    setTimeout(() => {
      toast.classList.remove("active");
    }, 3000);
  };
}

// 初始化移动端导航
function initMobileNav() {
  const menuToggle = document.querySelector(".mobile-navbar");
  const sidebar = document.querySelector(".sidebar");

  if (!menuToggle || !sidebar) return;

  menuToggle.addEventListener("click", function () {
    // 创建一个临时的侧边栏覆盖层
    if (!document.querySelector(".mobile-sidebar-overlay")) {
      const overlay = document.createElement("div");
      overlay.className = "mobile-sidebar-overlay";

      // 克隆侧边栏内容
      const sidebarClone = sidebar.cloneNode(true);
      sidebarClone.classList.add("mobile-sidebar");

      // 添加关闭按钮
      const closeBtn = document.createElement("button");
      closeBtn.className = "mobile-sidebar-close";
      closeBtn.innerHTML = '<i class="fas fa-times"></i>';
      sidebarClone.appendChild(closeBtn);

      overlay.appendChild(sidebarClone);
      document.body.appendChild(overlay);

      // 防止背景滚动
      document.body.style.overflow = "hidden";

      // 添加动画类
      setTimeout(() => {
        overlay.classList.add("active");
        sidebarClone.classList.add("active");
      }, 10);

      // 点击关闭按钮
      closeBtn.addEventListener("click", closeMobileSidebar);

      // 点击覆盖层关闭
      overlay.addEventListener("click", function (e) {
        if (e.target === overlay) {
          closeMobileSidebar();
        }
      });
    }
  });
}

// 初始化胶囊导航
function initCapsuleNav() {
  const backToTop = document.getElementById("back-to-top");

  // 返回顶部按钮点击事件
  if (backToTop) {
    // 监听滚动事件，显示/隐藏返回顶部按钮
    window.addEventListener("scroll", function () {
      if (window.scrollY > 300) {
        backToTop.classList.add("show");
      } else {
        backToTop.classList.remove("show");
      }
    });

    // 点击返回顶部
    backToTop.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }
}

// 初始化技能进度条动画
function initSkillsAnimation() {
  const skillBars = document.querySelectorAll(".skill-progress");

  if (!skillBars.length) return;

  // 检查元素是否在视口中
  function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.bottom >= 0
    );
  }

  // 初始化进度条宽度为0
  skillBars.forEach((bar) => {
    bar.style.width = "0";
  });

  // 处理滚动事件，显示进度条动画
  function handleScroll() {
    const skillsSection = document.querySelector(".skills-card");

    if (skillsSection && isElementInViewport(skillsSection)) {
      // 移除滚动事件监听器，避免重复触发
      window.removeEventListener("scroll", handleScroll);

      // 延迟一点时间再开始动画，确保DOM已经渲染
      setTimeout(() => {
        skillBars.forEach((bar) => {
          const targetWidth = bar.getAttribute("style").includes("width:")
            ? bar.getAttribute("style").match(/width:\s*(\d+)%/)[1] + "%"
            : "0";
          bar.style.width = targetWidth;
        });
      }, 300);
    }
  }

  // 添加滚动事件监听
  window.addEventListener("scroll", handleScroll);

  // 初始检查，如果页面加载时技能部分已经在视口中
  handleScroll();
}

// 图片查看器功能（点击动态中的图片可以全屏查看）
function initImageViewer() {
  const imageContainers = document.querySelectorAll(
    ".image-container:not(.more-images)"
  );

  imageContainers.forEach((container) => {
    container.addEventListener("click", function () {
      const img = this.querySelector("img");
      if (!img) return;

      // 创建全屏查看器
      const viewer = document.createElement("div");
      viewer.className = "image-viewer";
      viewer.innerHTML = `
                <div class="image-viewer-content">
                    <img src="${img.src}" alt="全屏图片">
                    <button class="close-viewer"><i class="fas fa-times"></i></button>
                </div>
            `;

      document.body.appendChild(viewer);
      document.body.style.overflow = "hidden";

      // 关闭查看器
      viewer.addEventListener("click", function (e) {
        if (e.target === this || e.target.closest(".close-viewer")) {
          this.remove();
          document.body.style.overflow = "";
        }
      });
    });
  });
}

// 页面加载完成后初始化图片查看器
window.addEventListener("load", function () {
  if (document.querySelector(".moment-images")) {
    initImageViewer();
  }
});
