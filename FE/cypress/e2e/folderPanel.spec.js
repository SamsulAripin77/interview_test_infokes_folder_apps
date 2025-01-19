describe('Folder Panel', () => {

    it('should display folders in the left panel', () => {
      cy.visit('/'); // Pastikan URL sesuai dengan halaman utama kamu
      cy.get('.panel-left').contains('Folder List'); // Pastikan ada judul folder list
      cy.get('.folder-header').should('have.length', 2); // Memastikan ada 2 folder di panel kiri
    });

    it('should toggle subfolders when folder is clicked', () => {
      cy.visit('/');
      cy.get('.folder-header').first().click(); // Klik folder pertama untuk toggle
      cy.get('.nested').should('be.visible'); // Pastikan subfolder pertama muncul setelah klik
      cy.get('.folder-header').first().click(); // Klik lagi untuk menutup folder
      cy.get('.nested').should('not.be.visible'); // Pastikan subfolder hilang
    });

    it('should display subfolders in the right panel when a folder is clicked', () => {
      cy.visit('/');
      cy.get('.folder-header').first().click(); // Klik folder pertama untuk membuka subfolder
      cy.get('.panel-right').contains('Contents of Provinsi Jawa Barat'); // Pastikan panel kanan menampilkan subfolder
    });

    it('should display subfolders in the right panel when a folder is clicked', () => {
      cy.visit('/');
      cy.get('.folder-header').last().click(); // Klik folder pertama untuk membuka subfolder
      cy.get('.panel-right').contains('Contents of Provinsi Jawa Tengah'); // Pastikan panel kanan menampilkan subfolder
    });

    it('should toggle nested subfolders when a folder is clicked', () => {
      cy.visit('/');
      cy.get('.folder-header').first().click(); // Klik folder pertama untuk membuka subfolder
      cy.get('.nested .folder-header').first().click(); // Klik subfolder pertama untuk membuka nested subfolder
      cy.get('.nested .nested').should('be.visible'); // Pastikan nested subfolder muncul
      cy.get('.nested .folder-header').first().click(); // Klik untuk menutup nested subfolder
      cy.get('.nested .nested').should('not.be.visible'); // Pastikan nested subfolder hilang
    });

  });
